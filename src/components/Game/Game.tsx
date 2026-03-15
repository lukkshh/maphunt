import Map from "@/components/Map/Map";

import styles from "./Game.module.scss";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

const TIMER = 2; // seconds

export default function Game() {
  const [countDownOver, setCountDownOver] = useState(false);
  const { score } = useGameStore();

  useEffect(() => {
    setTimeout(() => {
      setCountDownOver(true);
    }, TIMER * 1000);
  }, []);

  return (
    <div className={styles.game}>
      {!countDownOver && <img src="/places/123.jpg" />}

      {countDownOver && (
        <div className={styles.score}>
          <h2>Score: {score}</h2>
        </div>
      )}
      {countDownOver && <Map />}
    </div>
  );
}
