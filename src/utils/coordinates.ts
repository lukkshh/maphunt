type Bounds = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export function getRelativeCoordinates(
  e: MouseEvent,
  element: HTMLElement,
  bounds?: Bounds,
) {
  const rect = bounds ?? element.getBoundingClientRect();

  return {
    x: clamp01((e.clientX - rect.left) / rect.width),
    y: clamp01((e.clientY - rect.top) / rect.height),
  };
}

export function getContainedImageBox(image: HTMLImageElement) {
  const width = image.clientWidth;
  const height = image.clientHeight;

  if (!width || !height || !image.naturalWidth || !image.naturalHeight) {
    return {
      left: 0,
      top: 0,
      width,
      height,
    };
  }

  const imageRatio = image.naturalWidth / image.naturalHeight;
  const boxRatio = width / height;

  if (imageRatio > boxRatio) {
    const renderedHeight = width / imageRatio;

    return {
      left: 0,
      top: (height - renderedHeight) / 2,
      width,
      height: renderedHeight,
    };
  }

  const renderedWidth = height * imageRatio;

  return {
    left: (width - renderedWidth) / 2,
    top: 0,
    width: renderedWidth,
    height,
  };
}
