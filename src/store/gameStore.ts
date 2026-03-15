import { create } from "zustand";

interface GameState {
  score: number;
  setScore: (score: number) => void;
  addScore: (score: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  setScore: (score) => set({ score }),
  addScore: (score) => set((state) => ({ score: state.score + score })),
}));
