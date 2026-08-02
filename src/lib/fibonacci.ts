export const PHI = (1 + Math.sqrt(5)) / 2;

export function fibonacci(n: number): number {
  if (n <= 1) return 1;
  let a = 1;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

export function goldenAngle(
  index: number,
  total: number,
  radius: number
): { x: number; y: number } {
  const angle = index * 137.5077640500378 * (Math.PI / 180);
  const r = radius * Math.sqrt(index / total);
  return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}
