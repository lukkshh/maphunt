import type { Coordinates } from "@/types/coordinates";

export const createMarker = (coords: Coordinates, color: string) => {
  const marker = document.createElement("div");
  marker.classList.add("marker");
  marker.style.left = `${coords.x * 100}%`;
  marker.style.top = `${coords.y * 100}%`;
  marker.style.backgroundColor = color;
  return marker;
};
