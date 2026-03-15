import { useState } from "react";

import Game from "@/pages/Game/Game";
import Home from "@/pages/Home/Home";

import styles from "./App.module.scss";

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <section className={styles.container}>
      {!selectedGame ? <Home onSelectGame={setSelectedGame} /> : <Game />}
    </section>
  );
}

export default App;
