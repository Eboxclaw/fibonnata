import { sampleCamera } from "./camera";

type THREENS = typeof import("three");
type TSLNS = typeof import("three/tsl");

export interface OrganismHandle {
  setProgress: (p: number) => void;
  setPointer: (x: number, y: number) => void;
  setActive: (active: boolean) => void;
  resize: () => void;
  dispose: () => void;
}

function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / Math.max(1, n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

const CORE_VERT = /* glsl */ `
  attribute float aOrder;
  attribute float aSeed;
  uniform float uGrowth;
  uniform float uTime;
  uniform float uSize;
  uniform float uDpr;
  uniform float uViewH;
  uniform float uFovTan;

  varying float vAlpha;
  varying float vSeed;

  void main() {
    float appear = smoothstep(aOrder - 0.08, aOrder + 0.02, uGrowth);
    float radius = mix(0.22, 1.0, smoothstep(0.0, 0.9, uGrowth));
    float breathe = 1.0 + 0.025 * sin(uTime * 0.6 + aSeed * 6.2831);
    vec3 p = position * radius * breathe;
    // slight organic turbulence, calmer as the organism matures
    float wobble = (1.0 - uGrowth * 0.6) * 0.09;
    p += vec3(
      sin(uTime * 0.5 + aSeed * 12.0),
      cos(uTime * 0.43 + aSeed * 9.0),
      sin(uTime * 0.37 + aSeed * 15.0)
    ) * wobble;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // world-space point diameter projected to device pixels
    gl_PointSize = uSize * (1.0 + uGrowth * 0.6) * appear
      * (uViewH * 0.5) / max(0.001, uFovTan * -mv.z);
    gl_PointSize = clamp(gl_PointSize, 0.0, 10.0 * uDpr);

    vAlpha = appear;
    vSeed = aSeed;
  }
`;

const CORE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uEmber;
  uniform float uGrowth;
  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = length(d);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.12, r);
    float ember = step(0.86, vSeed) * (0.25 + 0.6 * uGrowth);
    vec3 c = mix(uColor, uEmber, ember);
    gl_FragColor = vec4(c, soft * vAlpha * (0.4 + 0.42 * uGrowth));
  }
`;

export interface OrganismOptions {
  reducedMotion: boolean;
  /** when provided, the scene renders through the WebGPU backend */
  gpu?: { tsl: TSLNS };
}

export async function createOrganism(
  container: HTMLElement,
  THREE: THREENS,
  opts: OrganismOptions
): Promise<OrganismHandle> {
  const small = window.matchMedia("(max-width: 767px)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
  const gpu = opts.gpu;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / Math.max(1, container.clientHeight),
    0.1,
    100
  );
  camera.position.set(0, 0.2, 6.4);

  type AnyRenderer = {
    setPixelRatio: (v: number) => void;
    setSize: (w: number, h: number) => void;
    domElement: HTMLCanvasElement;
    render: (s: unknown, c: unknown) => unknown;
    dispose: () => void;
  };

  let renderer: AnyRenderer;
  if (gpu) {
    const GPUCtor = (THREE as unknown as {
      WebGPURenderer: new (p: Record<string, unknown>) => AnyRenderer & {
        init: () => Promise<void>;
      };
    }).WebGPURenderer;
    const r = new GPUCtor({ alpha: true, antialias: !small });
    await r.init();
    renderer = r;
  } else {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !small,
    }) as unknown as AnyRenderer;
  }
  renderer.setPixelRatio(dpr);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  // ---- core cloud -----------------------------------------------------
  const count = small ? 900 : 2600;
  const base = fibonacciSphere(count);
  const positions = new Float32Array(count * 3);
  const order = new Float32Array(count);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const p = base[i]!;
    // shell thickness grows outward with index so growth reads as "getting bulkier"
    const jitter = 0.72 + (0.28 * ((i * 37) % 100)) / 100;
    positions[i * 3] = p[0] * 2.0 * jitter;
    positions[i * 3 + 1] = p[1] * 2.0 * jitter;
    positions[i * 3 + 2] = p[2] * 2.0 * jitter;
    order[i] = Math.pow(i / count, 0.85);
    seed[i] = ((i * 2654435761) % 1000) / 1000;
  }

  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  coreGeo.setAttribute("aOrder", new THREE.BufferAttribute(order, 1));
  coreGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

  const pointSize = small ? 0.026 : 0.02;

  // growth/time uniforms shared by both backends
  const uGrowth = { value: 0 };
  const uTime = { value: 0 };

  let coreMat: import("three").Material;
  let setViewH: (h: number) => void = () => {};
  let setFovTan: (t: number) => void = () => {};

  if (gpu) {
    const {
      Fn,
      attribute,
      uniform,
      positionLocal,
      float,
      vec3,
      vec4,
      sin,
      cos,
      mix,
      smoothstep,
      step,
      uv,
      length,
    } = gpu.tsl;

    const gGrowth = uniform(0);
    const gTime = uniform(0);
    // keep the plain objects in sync with the TSL uniforms
    Object.defineProperty(uGrowth, "value", {
      get: () => gGrowth.value,
      set: (v: number) => {
        gGrowth.value = v;
      },
    });
    Object.defineProperty(uTime, "value", {
      get: () => gTime.value,
      set: (v: number) => {
        gTime.value = v;
      },
    });

    const aOrder = attribute("aOrder", "float");
    const aSeed = attribute("aSeed", "float");

    const appear = smoothstep(aOrder.sub(0.08), aOrder.add(0.02), gGrowth);
    const radius = mix(float(0.22), float(1.0), smoothstep(0.0, 0.9, gGrowth));
    const breathe = float(1.0).add(sin(gTime.mul(0.6).add(aSeed.mul(6.2831))).mul(0.025));
    const wobbleAmt = float(1.0).sub(gGrowth.mul(0.6)).mul(0.09);
    const wobble = vec3(
      sin(gTime.mul(0.5).add(aSeed.mul(12.0))),
      cos(gTime.mul(0.43).add(aSeed.mul(9.0))),
      sin(gTime.mul(0.37).add(aSeed.mul(15.0)))
    ).mul(wobbleAmt);

    const colorBase = vec3(0.168, 0.168, 0.168);
    const colorEmber = vec3(0.69, 0.388, 0.173);
    const ember = step(0.86, aSeed).mul(float(0.25).add(gGrowth.mul(0.6)));

    const mat = new (THREE as unknown as {
      PointsNodeMaterial: new (p: Record<string, unknown>) => import("three").Material & {
        positionNode: unknown;
        sizeNode: unknown;
        colorNode: unknown;
        opacityNode: unknown;
        sizeAttenuation: boolean;
      };
    }).PointsNodeMaterial({ transparent: true, depthWrite: false });

    mat.sizeAttenuation = true;
    mat.positionNode = positionLocal.mul(radius).mul(breathe).add(wobble);
    mat.sizeNode = float(pointSize * 5.5)
      .mul(float(1.0).add(gGrowth.mul(0.6)))
      .mul(appear);
    mat.colorNode = mix(colorBase, colorEmber, ember);
    mat.opacityNode = Fn(() => {
      const r = length(uv().sub(0.5));
      const soft = smoothstep(0.5, 0.12, r);
      return soft.mul(appear).mul(float(0.4).add(gGrowth.mul(0.42)));
    })();
    coreMat = mat;
  } else {
    const mat = new THREE.ShaderMaterial({
      vertexShader: CORE_VERT,
      fragmentShader: CORE_FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uGrowth,
        uTime,
        uSize: { value: pointSize },
        uDpr: { value: dpr },
        uViewH: { value: container.clientHeight * dpr },
        uFovTan: { value: Math.tan((55 * Math.PI) / 360) },
        uColor: { value: new THREE.Color(0x2b2b2b) },
        uEmber: { value: new THREE.Color(0xb0632c) },
      },
    });
    setViewH = (h) => {
      mat.uniforms['uViewH']!.value = h;
    };
    setFovTan = (t) => {
      mat.uniforms['uFovTan']!.value = t;
    };
    coreMat = mat;
  }

  const core = new THREE.Points(coreGeo, coreMat);
  core.frustumCulled = false;
  group.add(core);

  // ---- filaments between near neighbours -------------------------------
  const linkCount = small ? 0 : 520;
  let links: import("three").LineSegments | null = null;
  let linkMat: import("three").LineBasicMaterial | null = null;
  if (linkCount > 0) {
    const lp = new Float32Array(linkCount * 2 * 3);
    for (let i = 0; i < linkCount; i++) {
      const a = Math.floor((i / linkCount) * count);
      const b = Math.min(count - 1, a + 8 + ((i * 13) % 21));
      for (let k = 0; k < 3; k++) {
        lp[i * 6 + k] = positions[a * 3 + k]!;
        lp[i * 6 + 3 + k] = positions[b * 3 + k]!;
      }
    }
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    linkMat = new THREE.LineBasicMaterial({
      color: 0x555555,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    links = new THREE.LineSegments(linkGeo, linkMat);
    group.add(links);
  }

  // ---- adapter and LoRA shards that get equipped ------------------------
  const shardCount = small ? 8 : 14;
  const shards: import("three").Mesh[] = [];
  const shardGeo = new THREE.OctahedronGeometry(0.28);
  for (let i = 0; i < shardCount; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: i % 4 === 0 ? 0xb0632c : 0x3a3a3a,
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    const m = new THREE.Mesh(shardGeo, mat);
    const a = (i / shardCount) * Math.PI * 2;
    m.userData['from'] = new THREE.Vector3(
      Math.cos(a) * 7,
      Math.sin(a * 1.7) * 4,
      Math.sin(a) * 7
    );
    m.userData['phase'] = i / shardCount;
    m.position.copy(m.userData['from'] as import("three").Vector3);
    shards.push(m);
    group.add(m);
  }

  // ---- state -----------------------------------------------------------
  let progress = 0;
  let pointerX = 0;
  let pointerY = 0;
  let px = 0;
  let py = 0;
  let active = true;
  let raf = 0;
  let disposed = false;
  const clock = new THREE.Clock();
  const camTarget = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  const smoothstepJs = (e0: number, e1: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  };

  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!active || disposed) return;

    const t = clock.getElapsedTime();
    const growth = progress;

    uGrowth.value = growth;
    uTime.value = opts.reducedMotion ? 0 : t;

    if (linkMat) linkMat.opacity = 0.04 + 0.2 * smoothstepJs(0.35, 1, growth);
    if (links) links.scale.setScalar(0.22 + 0.78 * smoothstepJs(0, 0.9, growth));

    // shards fly in and are equipped during the middle of the story
    for (const m of shards) {
      const phase = m.userData['phase'] as number;
      const startAt = 0.3 + phase * 0.28;
      const eat = smoothstepJs(startAt, startAt + 0.18, growth);
      const from = m.userData['from'] as import("three").Vector3;
      tmp.copy(from).multiplyScalar(1 - eat * 0.86);
      m.position.copy(tmp);
      const mat = m.material as import("three").MeshBasicMaterial;
      mat.opacity = Math.min(smoothstepJs(startAt - 0.08, startAt, growth), 1 - eat * 0.55) * 0.85;
      if (!opts.reducedMotion) {
        m.rotation.x += 0.004;
        m.rotation.y += 0.006;
      }
      m.scale.setScalar(1 - eat * 0.35);
    }

    if (!opts.reducedMotion) {
      group.rotation.y += 0.0009 + growth * 0.0012;
      group.rotation.x = Math.sin(t * 0.12) * 0.08;
    }

    // cinematic camera path + damped pointer parallax
    const shot = sampleCamera(growth);
    px += (pointerX - px) * 0.05;
    py += (pointerY - py) * 0.05;
    camera.position.set(
      shot.position[0] + px * 0.8,
      shot.position[1] - py * 0.6,
      shot.position[2]
    );
    if (Math.abs(camera.fov - shot.fov) > 0.01) {
      camera.fov = shot.fov;
      setFovTan(Math.tan((shot.fov * Math.PI) / 360));
      camera.updateProjectionMatrix();
    }
    camTarget.set(shot.target[0], shot.target[1], shot.target[2]);
    camera.lookAt(camTarget);

    renderer.render(scene, camera);
  };

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    setViewH(h * dpr);
  };

  raf = requestAnimationFrame(frame);

  return {
    setProgress: (p: number) => {
      progress = Math.min(1, Math.max(0, p));
    },
    setPointer: (x: number, y: number) => {
      pointerX = x;
      pointerY = y;
    },
    setActive: (a: boolean) => {
      active = a;
      if (a) clock.getDelta();
    },
    resize,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(raf);
      coreGeo.dispose();
      coreMat.dispose();
      shardGeo.dispose();
      for (const m of shards) (m.material as import("three").Material).dispose();
      if (links) {
        links.geometry.dispose();
        linkMat?.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
