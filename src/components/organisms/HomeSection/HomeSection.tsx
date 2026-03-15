"use client";
import { useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Card from "@/components/atoms/Card/Card";
import Badge from "@/components/atoms/Badge/Badge";
import Popup from "@/components/atoms/Popup/Popup";

import styles from "./HomeSection.module.scss";
import { useRouter } from "next/navigation";

const GAME_OPTIONS = [
  {
    id: "cs2",
    title: "CS2",
    img: "/images/cs2.jpg",
    description:
      "test your tactical skills, explore bomb sites, and find the key locations before the round ends!",
    status: "available",
  },

  {
    id: "more",
    title: "More Games",
    img: "/images/more_games.png",
    description: "Explore more exciting game modes!",
    status: "coming-soon",
  },
] as const;

export default function HomeSection() {
  const router = useRouter();
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleClick = (game: string) => {
    setPopUpOpen(true);
    setSelectedGame(game);
  };

  const handleDifficultySelect = (difficulty: string, gameId: string) => {
    setPopUpOpen(false);
    router.push(`/game/${gameId}-${difficulty}`);
  };

  return (
    <main className={styles.page}>
      {popUpOpen && (
        <Popup className={styles.difficultyPopup}>
          <p className={styles.cardText}>Choose difficulty</p>
          <div className={styles.cardButtonGroup}>
            <Button
              onClick={() => handleDifficultySelect("easy", selectedGame!)}
              variant="primary"
              className={styles.cardButton}
            >
              Easy
            </Button>
            <Button
              onClick={() => handleDifficultySelect("medium", selectedGame!)}
              variant="primary"
              className={styles.cardButton}
            >
              Medium
            </Button>
            <Button
              onClick={() => handleDifficultySelect("hard", selectedGame!)}
              variant="primary"
              className={styles.cardButton}
            >
              Hard
            </Button>
          </div>
        </Popup>
      )}
      <header className={styles.header}>
        <p className={styles.eyebrow}>MapHunt</p>
        <h1>Pick game </h1>
        <p className={styles.subtitle}>
          explore, guess, and see how well you know the map!
        </p>
      </header>

      <section className={styles.grid} aria-label="Game choices">
        {GAME_OPTIONS.map((game) => {
          const available = game.status === "available";

          return (
            <Card
              key={game.id}
              className={styles.card}
              available={available}
              coverImage={"img" in game ? game.img : undefined}
              coverLabel={`${game.title} preview`}
            >
              <div className={styles.cardTopRow}>
                <h2>{game.title}</h2>
                <Badge>{available ? "Ready" : "Soon"}</Badge>
              </div>

              <p>{game.description}</p>

              <Button
                variant="primary"
                disabled={!available}
                onClick={() => handleClick(game.id)}
                className={styles.cardButton}
              >
                {available ? "Play now" : "Coming soon"}
              </Button>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
