import Game from "@/pages/Game/Game";

import { GameDifficulty } from "@/types/game";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  //   const game = id.split("-").slice(0, -1).join("-");
  const difficulty = id.split("-").slice(-1)[0];

  return (
    <>
      <Game TIMER={GameDifficulty[difficulty as keyof typeof GameDifficulty]} />
    </>
  );
}
