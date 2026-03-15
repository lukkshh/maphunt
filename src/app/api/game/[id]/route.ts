export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const game = id.split("-").slice(0, -1).join("-");
  const difficulty = id.split("-").slice(-1)[0];

  return new Response(JSON.stringify({ id, game, difficulty }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
