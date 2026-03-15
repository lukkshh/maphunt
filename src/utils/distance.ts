import type { Coordinates } from "../types/coordinates";

export function calculateDistance(a: Coordinates, b: Coordinates) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
