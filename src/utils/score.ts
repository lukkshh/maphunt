export function calculateScore(distance: number) {
  const maxScore = 2500;
  const score = maxScore * Math.max(0, 1 - distance ** 2 * 10);
  // Math.max(0, Math.round(maxScore - distance * 10000))

  return score;
}
