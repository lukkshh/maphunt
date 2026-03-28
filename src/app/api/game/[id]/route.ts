const DIFFICULTIES = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

const GAMES = ["cs2"] as const;
type Game = (typeof GAMES)[number];

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const game = id.split("-").slice(0, -1).join("-") as Game;

  const difficulty = id.split("-").slice(-1)[0] as Difficulty;

  if (!game || !difficulty) {
    return new Response(
      JSON.stringify({
        error: "Invalid or Malformed URL. expected format: game-difficulty",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!GAMES.includes(game as Game)) {
    return new Response(
      JSON.stringify({
        error: `Invalid game. expected one of: ${GAMES.join(", ")}`,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  if (!DIFFICULTIES.includes(difficulty as Difficulty)) {
    return new Response(
      JSON.stringify({
        error: `Invalid difficulty. expected one of: ${DIFFICULTIES.join(", ")}`,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ id, game, difficulty }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
