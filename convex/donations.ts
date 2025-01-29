import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { httpAction, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    streamerId: v.id("users"),
    name: v.string(),
    amount: v.number(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const donationId = await ctx.db.insert("donations", {
      ...args,
      createdAt: Date.now(),
    });
    return donationId;
  },
});
export const createDonation = httpAction(async (ctx, request) => {
  const body = await request.json();
  console.log(body)
  // const donationId = await ctx.runMutation(api.donations.create, {
  //   streamerId: body.metadata.streamerId,
  //   name: body.metadata.name,
  //   message: body.metadata.message,
  //   amount: body.amount.value,
  // });

  return new Response(JSON.stringify({ donationId }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
export const listForStreamer = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Unauthenticated");
    }
    return await ctx.db
      .query("donations")
      .withIndex("by_streamer", (q) =>
        q.eq("streamerId", user.subject.split("|")[0] as Id<"users">)
      )
      .order("desc")
      .collect();
  },
});

export const getLatestForStreamer = query({
  args: { streamerId: v.id("users") },
  handler: async (ctx, args) => {
    const latestDonation = await ctx.db
      .query("donations")
      .withIndex("by_streamer", (q) => q.eq("streamerId", args.streamerId))
      .order("desc")
      .first();
    return latestDonation;
  },
});
