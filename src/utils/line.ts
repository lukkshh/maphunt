type CreateLineOptions = {
  color?: string;
  thickness?: number;
  trim?: number;
};

export const createLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: string | CreateLineOptions = "blue",
) => {
  const {
    color = "blue",
    thickness = 2,
    trim = 0,
  } = typeof options === "string" ? { color: options } : options;

  const line = document.createElement("div");

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);

  if (!length) {
    line.style.position = "absolute";
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.width = "0px";
    line.style.height = `${thickness}px`;
    line.style.backgroundColor = color;
    line.style.pointerEvents = "none";
    return line;
  }

  const safeTrim = Math.max(0, Math.min(trim, length / 2));
  const angle = Math.atan2(dy, dx);
  const unitX = dx / length;
  const unitY = dy / length;

  const startX = x1 + unitX * safeTrim;
  const startY = y1 + unitY * safeTrim;
  const visibleLength = length - safeTrim * 2;

  line.classList.add("line");

  line.style.position = "absolute";
  line.style.left = `${startX}px`;
  line.style.top = `${startY}px`;
  line.style.width = `${visibleLength}px`;
  line.style.height = `${thickness}px`;
  line.style.backgroundColor = color;
  line.style.transformOrigin = "0 0";
  line.style.transform = `rotate(${angle}rad)`;
  line.style.pointerEvents = "none";

  return line;
};
