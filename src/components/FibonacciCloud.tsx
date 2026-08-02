import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function fibonacciSpherePoints(n: number, radius: number) {
  const pts: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    pts.push({ x: x * radius, y: y * radius, z: z * radius });
  }
  return pts;
}

export function FibonacciCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setFallback(true);
      return;
    }

    let mounted = true;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (!mounted) return;
      cleanup = buildScene(container, THREE, reducedMotion);
    });

    return () => {
      mounted = false;
      cleanup();
    };
  }, [reducedMotion]);

  if (fallback) {
    return <FibonacciCloudSVG />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-hidden="true"
    />
  );
}

function buildScene(
  container: HTMLDivElement,
  THREE: typeof import("three"),
  reducedMotion: boolean
) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const count = 1200;
  const positions = new Float32Array(count * 3);
  const pts = fibonacciSpherePoints(count, 2.2);
  for (const [i, p] of pts.entries()) {
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x8a8a8a,
    size: 0.025,
    transparent: true,
    opacity: 0.55,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let mouseX = 0;
  let mouseY = 0;
  const onMove = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  };
  window.addEventListener("mousemove", onMove);

  let raf = 0;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    if (!reducedMotion) {
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
    }
    points.rotation.x += mouseY * 0.0005;
    points.rotation.y += mouseX * 0.0005;
    renderer.render(scene, camera);
  };
  animate();

  const onResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };
  window.addEventListener("resize", onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("resize", onResize);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

function FibonacciCloudSVG() {
  const count = 120;
  const pts = fibonacciSpherePoints(count, 1);
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-40"
      viewBox="-1.2 -1.2 2.4 2.4"
      aria-hidden="true"
    >
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={0.008 + (i % 5) * 0.0015}
          fill="currentColor"
          className="text-steel animate-pulse-slow"
          style={{ animationDelay: `${(i % 20) * 0.1}s` }}
        />
      ))}
    </svg>
  );
}
