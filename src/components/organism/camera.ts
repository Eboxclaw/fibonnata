export type Vec3 = [number, number, number];

export interface CameraKey {
  /** normalized scroll position of this keyframe */
  at: number;
  position: Vec3;
  target: Vec3;
  fov: number;
}

/**
 * A virtual DP moving around the organism: wide establishing shot, low orbit,
 * a push-in during fusion, then a pull-back reveal.
 */
export const CAMERA_PATH: CameraKey[] = [
  { at: 0.0, position: [0, 0.2, 7.6], target: [0, 0, 0], fov: 55 },
  { at: 0.25, position: [4.6, -1.4, 6.2], target: [0, 0.1, 0], fov: 52 },
  { at: 0.5, position: [-4.6, 2.2, 5.6], target: [0, 0, 0], fov: 48 },
  { at: 0.75, position: [-1.4, 0.6, 4.6], target: [0, 0, 0], fov: 46 },
  { at: 1.0, position: [2.0, 1.6, 9.0], target: [0, 0, 0], fov: 50 },
];


export function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function sampleCamera(p: number) {
  const keys = CAMERA_PATH;
  const clamped = Math.min(1, Math.max(0, p));
  let i = 0;
  while (i < keys.length - 2 && clamped > keys[i + 1]!.at) i++;
  const a = keys[i]!;
  const b = keys[i + 1]!;
  const span = b.at - a.at || 1;
  const t = easeInOut(Math.min(1, Math.max(0, (clamped - a.at) / span)));

  const position: Vec3 = [
    lerp(a.position[0], b.position[0], t),
    lerp(a.position[1], b.position[1], t),
    lerp(a.position[2], b.position[2], t),
  ];
  const target: Vec3 = [
    lerp(a.target[0], b.target[0], t),
    lerp(a.target[1], b.target[1], t),
    lerp(a.target[2], b.target[2], t),
  ];
  return { position, target, fov: lerp(a.fov, b.fov, t) };
}
