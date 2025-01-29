export async function POST(req: Request) {
  return new Response(req.body, {
    status: 200,
  });
}
