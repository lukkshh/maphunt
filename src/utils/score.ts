export function calculateScore(distance: number, maxDistance = 300): number {
  const score = Math.max(0, 100 - (distance / maxDistance) * 100);
  return Math.round(score);
}
