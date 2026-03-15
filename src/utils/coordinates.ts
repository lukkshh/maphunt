const cursorHotspotX = -6;
const cursorHotspotY = -6;

export function getRelativeCoordinates(e: MouseEvent, element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return {
    x: (e.clientX - rect.left - cursorHotspotX) / rect.width,
    y: (e.clientY - rect.top - cursorHotspotY) / rect.height,
  };
}
