import { useRef } from "react";
import styles from "./Map.module.scss";

import { getRelativeCoordinates } from "@/utils/coordinates";
import { createMarker } from "@/utils/marker";
import { calculateDistance } from "@/utils/distance";
import { calculateScore } from "@/utils/score";
import { createLine } from "@/utils/line";
import { useGameStore } from "@/store/gameStore";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { addScore } = useGameStore();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const coords = getRelativeCoordinates(e.nativeEvent, e.currentTarget);
    console.log(coords);
    const marker = createMarker(coords, "red");
    if (mapRef.current) {
      mapRef.current.appendChild(marker);
    }

    setTimeout(() => {
      const marker = createMarker({ x: 0.519, y: 0.747 }, "lime");
      if (mapRef.current) {
        mapRef.current.appendChild(marker);
      }
    }, 500);
    const mapWidth = mapRef.current!.clientWidth;
    const mapHeight = mapRef.current!.clientHeight;

    const distancePx = calculateDistance(
      { x: coords.x * mapWidth, y: coords.y * mapHeight },
      { x: 0.519 * mapWidth, y: 0.747 * mapHeight },
    );

    console.log("Distance (px):", distancePx.toFixed(2), "px");
    const score = calculateScore(distancePx);
    console.log("Score:", score);
    addScore(score);
    if (mapRef.current) {
      const line = createLine(
        coords.x * mapWidth,
        coords.y * mapHeight,
        0.519 * mapWidth,
        0.747 * mapHeight,
        "lime",
      );
      mapRef.current.appendChild(line);
    }
  };

  return (
    <div ref={mapRef} onClick={handleClick} className={styles.container}>
      <img
        className={styles.mapImage}
        src="/maps/cs2_mirage_map.webp"
        alt="Map"
      />
    </div>
  );
}
