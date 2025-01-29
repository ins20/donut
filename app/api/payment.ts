import type { NextApiRequest } from "next";

export default function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    console.log(req.body);
  }
}
