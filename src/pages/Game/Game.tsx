import Map from "@/components/Map/Map";
import styles from "./Game.module.scss";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

const TIMER = 0.5;

export default function Game() {
  const [countDownOver, setCountDownOver] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { totalScore, score, distance } = useGameStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountDownOver(true);
    }, TIMER * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <header>
        <a href="/">Home</a>
        <p>
          Total Score: <span>{totalScore}</span>
        </p>
      </header>

      <section className={styles.gameArea}>
        {!countDownOver && (
          <img
            className={styles.mapImage}
            src="/places/123.jpg"
            alt="Place"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        )}

        {!imageLoaded && !imageError && !countDownOver && (
          <p>Loading image...</p>
        )}
        {imageError && <p>Failed to load image.</p>}

        {countDownOver && distance !== "0" && (
          <div className={styles.results}>
            <p>
              Score: <span>{score}</span>
            </p>
            <p>
              Distance: <span> {distance}</span>
            </p>
          </div>
        )}

        {countDownOver && <Map />}
      </section>
    </div>
  );
}
