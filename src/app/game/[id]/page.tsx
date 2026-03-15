import GameSection from "@/components/organisms/GameSection/GameSection";
import api from "@/lib/axios";

import { GameDifficulty } from "@/types/game";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await api.get(`/game/${id}`);

  console.log("Game data:", res.data);

  const difficulty = id.split("-").slice(-1)[0];

  return (
    <>
      <GameSection
        TIMER={GameDifficulty[difficulty as keyof typeof GameDifficulty]}
      />
    </>
  );
}
