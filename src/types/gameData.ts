interface GameData {
  id: number;
  game: string;
  difficulty: string;
  mapSrc: string;
  data: MiniGameData[];
}

interface MiniGameData {
  id: number;
  placeSrc: string;
  target: { x: number; y: number };
}
