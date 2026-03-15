"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import Map from "@/components/molecules/Map/Map";

import styles from "./GameSection.module.scss";

interface GameProps {
  TIMER?: number;
}

export default function GameSection({ TIMER = 0.5 }: GameProps) {
  const [countDownOver, setCountDownOver] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { totalScore, score, distance } = useGameStore();

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setCountDownOver(true);
      }, TIMER * 1000);

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, TIMER]);

  return (
    <div className={styles.container}>
      <header>
        <Link href="/">Home</Link>
        <p>
          Total Score: <span>{totalScore}</span>
        </p>
      </header>

      <section className={styles.gameArea}>
        {!countDownOver && (
          <div className={styles.imageWrapper}>
            <Image
              className={styles.mapImage}
              src="/places/123.jpg"
              alt="Place"
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
              priority
            />
          </div>
        )}

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
