export const createLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = "blue",
) => {
  const line = document.createElement("div");

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  line.style.position = "absolute";
  line.style.left = `${x1 + 9}px`;
  line.style.top = `${y1 + 25}px`;
  line.style.width = `${length - 30}px`;
  line.style.height = `2px`;
  line.style.backgroundColor = color;
  line.style.transformOrigin = "0 0";
  line.style.transform = `rotate(${angle}deg)`;

  return line;
};
