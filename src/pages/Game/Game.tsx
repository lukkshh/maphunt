import Map from "@/components/Map/Map";
import styles from "./Game.module.scss";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

const TIMER = 0.5; // seconds

export default function Game() {
  const [countDownOver, setCountDownOver] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { score } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountDownOver(true);
    }, TIMER * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <h1>dkdkdkd</h1>
      </header>

      {!countDownOver && (
        <img
          src="/places/123.jpg"
          alt="Place"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      )}

      {!imageLoaded && !imageError && !countDownOver && <p>Loading image...</p>}
      {imageError && <p>Failed to load image.</p>}

      {countDownOver && (
        <div className={styles.score}>
          <h2>Score: {score}</h2>
        </div>
      )}

      {countDownOver && <Map />}
    </div>
  );
}
