export async function POST(req: Request) {
  console.log(req.body)
  return new Response(req.body, {
    status: 200,
  });
}
