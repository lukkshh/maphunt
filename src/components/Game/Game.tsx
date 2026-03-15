import Map from "@/components/Map/Map";

import styles from "./Game.module.scss";
import { useEffect, useState } from "react";

const TIMER = 2; // seconds

export default function Game() {
  const [countDownOver, setCountDownOver] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCountDownOver(true);
    }, TIMER * 1000);
  }, []);

  return (
    <div className={styles.game}>
      {/* {!countDownOver && <img src="/places/123.jpg" />} */}

      {countDownOver && <Map />}
    </div>
  );
}
