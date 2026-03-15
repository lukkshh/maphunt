import type { Coordinates } from "@/types/coordinates";

export const createMarker = (position: Coordinates, color: string) => {
  const marker = document.createElement("div");
  marker.classList.add("marker");
  marker.style.left = `${position.x}px`;
  marker.style.top = `${position.y}px`;
  marker.style.transform = "translate(-50%, -50%)";
  marker.style.backgroundColor = color;
  return marker;
};
