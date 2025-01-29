import type { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  return new Response(req.body, {
    status: 200,
  });
}
