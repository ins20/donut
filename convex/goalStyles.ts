import { v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { getStreamerId } from "./users";

// CRUD для goalStyles
async function generateDefaultTitle(ctx: MutationCtx) {
  const streamerId = await getStreamerId(ctx);
  const goals = await ctx.db
    .query("goalStyles")
    .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
    .collect();
  return `Goal${goals.length + 1}`;
}

export const createGoalStyle = mutation({
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    const name = await generateDefaultTitle(ctx);
    return await ctx.db.insert("goalStyles", { name, streamerId });
  },
});

export const getGoalStyles = query({
  args: {},
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    return await ctx.db
      .query("goalStyles")
      .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
      .collect();
  },
});

export const updateGoalStyle = mutation({
  args: {
    id: v.id("goalStyles"),
    name: v.optional(v.string()),
    direction: v.optional(v.boolean()),
    colorFilled: v.optional(v.string()),
    backgroundColor: v.optional(v.string()),
    colorBorder: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const streamerId = await getStreamerId(ctx);
    const { id, ...update } = args;
    const existingStyle = await ctx.db.get(id);
    if (!existingStyle || existingStyle.streamerId !== streamerId) {
      throw new Error("Стиль не найден или нет прав доступа");
    }
    return await ctx.db.patch(id, update);
  },
});

export const deleteGoalStyle = mutation({
  args: { id: v.id("goalStyles") },
  handler: async (ctx, args) => {
    const streamerId = await getStreamerId(ctx);
    const existingStyle = await ctx.db.get(args.id);
    if (!existingStyle || existingStyle.streamerId !== streamerId) {
      throw new Error("Стиль не найден или нет прав доступа");
    }
    return await ctx.db.delete(args.id);
  },
});
