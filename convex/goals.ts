import { v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { getStreamerId } from "./users";

export async function generateDefaultTitle(ctx: MutationCtx) {
  const streamerId = await getStreamerId(ctx);
  const goals = await ctx.db
    .query("goals")
    .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
    .collect();
  return `Goal${goals.length + 1}`;
}

export const createGoal = mutation({
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    const title = await generateDefaultTitle(ctx);
    const createdAt = Date.now();
    return await ctx.db.insert("goals", {
      title,
      createdAt,
      streamerId,
    });
  },
});

export const getGoals = query({
  args: {},
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    return await ctx.db
      .query("goals")
      .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
      .collect();
  },
});

export const getGoalById = query({
  args: { goalId: v.id("goals") },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.goalId);

    if (!goal) {
      return null;
    }

    const [alertStyle, goalStyle] = await Promise.all([
      goal.alertStyleId ? ctx.db.get(goal.alertStyleId) : null,
      goal.goalStyleId ? ctx.db.get(goal.goalStyleId) : null,
    ]);

    return {
      ...goal,
      alertStyle,
      goalStyle,
    };
  },
});
export const updateGoal = mutation({
  args: {
    id: v.id("goals"),
    title: v.optional(v.string()),
    alertStyleId: v.optional(v.id("alertStyles")),
    goalStyleId: v.optional(v.id("goalStyles")),
    collected: v.optional(v.number()),
    total: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const streamerId = await getStreamerId(ctx);
    const { id, ...update } = args;
    const existingGoal = await ctx.db.get(id);
    if (!existingGoal || existingGoal.streamerId !== streamerId) {
      throw new Error("Цель не найдена или нет прав доступа");
    }
    return await ctx.db.patch(id, update);
  },
});

export const deleteGoal = mutation({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    const streamerId = await getStreamerId(ctx);
    const existingGoal = await ctx.db.get(args.id);
    if (!existingGoal || existingGoal.streamerId !== streamerId) {
      throw new Error("Цель не найдена или нет прав доступа");
    }
    return await ctx.db.delete(args.id);
  },
});
