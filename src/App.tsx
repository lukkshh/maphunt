import { useState } from "react";

import Game from "@/pages/Game/Game";
import Home from "@/pages/Home/Home";

import styles from "./App.module.scss";

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleGameSelect = (data: string) => {
    setSelectedGame(data);
  };

  return (
    <section className={styles.container}>
      {!selectedGame ? <Home onSelectGame={handleGameSelect} /> : <Game />}
    </section>
  );
}

export default App;
