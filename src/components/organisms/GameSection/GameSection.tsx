"use client";

import { useGameStore } from "@/store/gameStore";
import { useEffect, useState } from "react";

import Loader from "@/components/molecules/Loader/Loader";

import Image from "next/image";
import Link from "next/link";

import Map from "@/components/molecules/Map/Map";

import styles from "./GameSection.module.scss";

interface GameProps {
  TIMER?: number;
  DATA: GameData;
}

export default function GameSection({ TIMER = 0.5, DATA }: GameProps) {
  const [countDownOver, setCountDownOver] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { totalScore, score, distance, setDistance } = useGameStore();

  const totalSteps = DATA.data.length;

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (imageLoaded && !loading) {
      const timer = setTimeout(() => {
        setCountDownOver(true);
      }, TIMER * 1000);

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, TIMER, loading]);

  const handleNext = () => {
    if (isTransitioning) {
      return;
    }

    if (step >= totalSteps - 1) {
      return;
    }

    setIsTransitioning(true);

    setTimeout(() => {
      setStep((prev) => prev + 1);
      setCountDownOver(false);
      setImageLoaded(false);
      setDistance("0");
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <Loader
        onDone={() => {
          setLoading(false);
        }}
      />
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
              src={DATA.data[step].placeSrc}
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

        {countDownOver && (
          <Map
            onHandleClick={handleNext}
            mapSrc={DATA.mapSrc}
            target={DATA.data[step].target}
            disabled={isTransitioning}
          />
        )}
      </section>
    </div>
  );
}
