import Button from "@/components/Button/Button";

import styles from "./Home.module.scss";
import Card from "@/components/Card/Card";
import Badge from "@/components/Badge/Badge";

type HomeProps = {
  onSelectGame: (gameId: string) => void;
};

const GAME_OPTIONS = [
  {
    id: "cs2",
    title: "CS2",
    description:
      "test your tactical skills, explore bomb sites, and find the key locations before the round ends!",
    status: "available",
  },

  {
    id: "more",
    title: "More Games",
    description: "Explore more exciting game modes!",
    status: "coming-soon",
  },
] as const;

export default function Home({ onSelectGame }: HomeProps) {
  return (
    <main className={styles.page}>
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
            <Card key={game.id} className={styles.card} available={available}>
              <div className={styles.cardTopRow}>
                <h2>{game.title}</h2>
                <Badge>{available ? "Ready" : "Soon"}</Badge>
              </div>

              <p>{game.description}</p>

              <Button
                variant="primary"
                disabled={!available}
                onClick={() => onSelectGame(game.id)}
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
