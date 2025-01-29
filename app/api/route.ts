import { api } from "@/convex/_generated/api";
import { httpAction } from "@/convex/_generated/server";

export const POST = httpAction(async (ctx, request) => {
  const body = await request.json();

  const donationId = await ctx.runMutation(api.donations.create, {
    streamerId: body.metadata.streamerId,
    name: body.metadata.name,
    message: body.metadata.message,
    amount: body.amount.value,
  });

  return new Response(JSON.stringify({ donationId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
