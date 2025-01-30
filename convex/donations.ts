import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { httpAction, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    goalId: v.id("goals"),
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
    const collected = (await ctx.db.get(args.goalId))?.collected || 0;
    await ctx.db.patch(args.goalId, {
      collected: collected + args.amount,
    });
    return donationId;
  },
});
export const createDonation = httpAction(async (ctx, request) => {
  const data = await request.json();
  await ctx.runMutation(api.donations.create, {
    goalId: data.object.metadata.goalId,
    streamerId: data.object.metadata.streamerId,
    name: data.object.metadata.name,
    message: data.object.metadata.message,
    amount: parseFloat(data.object.amount.value),
  });
  return new Response("", {
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

    if (!latestDonation) {
      return null;
    }
    const goal = await ctx.db.get(latestDonation.goalId);

    if (!goal) {
      return { ...latestDonation, goal: null };
    }

    const [alertStyle, goalStyle] = await Promise.all([
      goal.alertStyleId ? ctx.db.get(goal.alertStyleId) : null,
      goal.goalStyleId ? ctx.db.get(goal.goalStyleId) : null,
    ]);

    return {
      ...latestDonation,
      goal: {
        ...goal,
        alertStyle,
      },
    };
  },
});
