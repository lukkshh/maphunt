import { create } from "zustand";

interface GameState {
  score: number;
  totalScore: number;
  distance: string;
  addScore: (score: number) => void;
  setDistance: (distance: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  totalScore: 0,
  distance: "0",
  setDistance: (distance) => set({ distance }),

  addScore: (score) =>
    set((state) => ({
      score: score,
      totalScore: state.totalScore + score,
    })),
}));
