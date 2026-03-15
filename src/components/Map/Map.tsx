import { useRef } from "react";
import styles from "./Map.module.scss";

import { getRelativeCoordinates } from "@/utils/coordinates";
import { createMarker } from "@/utils/marker";
import { calculateDistance } from "@/utils/distance";
import { calculateScore } from "@/utils/score";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

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

    const distance = calculateDistance(coords, { x: 0.519, y: 0.747 });
    console.log("Distance:", distance);
    const score = calculateScore(distance);
    console.log("Score:", score);

    // alert(`score: ${score}`);
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
