import type { NextApiRequest } from "next";

export default function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    return Response.json(JSON.parse(req.body));
  }
}
