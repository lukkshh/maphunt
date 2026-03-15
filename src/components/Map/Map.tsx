import { useRef } from "react";
import styles from "./Map.module.scss";

import {
  getContainedImageBox,
  getRelativeCoordinates,
} from "@/utils/coordinates";
import { createMarker } from "@/utils/marker";
import { calculateDistance } from "@/utils/distance";
import { calculateScore } from "@/utils/score";
import { createLine } from "@/utils/line";
import { useGameStore } from "@/store/gameStore";

const TARGET = { x: 0.519, y: 0.747 };
const MARKER_RADIUS = 10;

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageRef = useRef<HTMLImageElement>(null);
  const { addScore } = useGameStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current || !mapImageRef.current) {
      return;
    }

    const mapRect = mapRef.current.getBoundingClientRect();
    const imageRect = mapImageRef.current.getBoundingClientRect();
    const imageBox = getContainedImageBox(mapImageRef.current);

    const renderedBounds = {
      left: imageRect.left + imageBox.left,
      top: imageRect.top + imageBox.top,
      width: imageBox.width,
      height: imageBox.height,
    };

    if (!renderedBounds.width || !renderedBounds.height) {
      return;
    }

    const clickX = e.clientX;
    const clickY = e.clientY;
    const outsideImage =
      clickX < renderedBounds.left ||
      clickX > renderedBounds.left + renderedBounds.width ||
      clickY < renderedBounds.top ||
      clickY > renderedBounds.top + renderedBounds.height;

    if (outsideImage) {
      return;
    }

    const coords = getRelativeCoordinates(
      e.nativeEvent,
      e.currentTarget,
      renderedBounds,
    );

    const guessPoint = {
      x: renderedBounds.left - mapRect.left + coords.x * renderedBounds.width,
      y: renderedBounds.top - mapRect.top + coords.y * renderedBounds.height,
    };

    const targetPoint = {
      x: renderedBounds.left - mapRect.left + TARGET.x * renderedBounds.width,
      y: renderedBounds.top - mapRect.top + TARGET.y * renderedBounds.height,
    };

    let marker = createMarker(guessPoint, "red");
    mapRef.current.appendChild(marker);

    marker = createMarker(targetPoint, "lime");
    mapRef.current.appendChild(marker);

    const distancePx = calculateDistance(guessPoint, targetPoint);

    const score = calculateScore(distancePx);
    addScore(score);

    const line = createLine(
      guessPoint.x,
      guessPoint.y,
      targetPoint.x,
      targetPoint.y,
      {
        color: "lime",
        trim: MARKER_RADIUS,
      },
    );
    mapRef.current.appendChild(line);
  };

  return (
    <div ref={mapRef} onClick={handleClick} className={styles.container}>
      <img
        ref={mapImageRef}
        className={styles.mapImage}
        src="/maps/cs2_mirage_map.webp"
        alt="Map"
      />
    </div>
  );
}
