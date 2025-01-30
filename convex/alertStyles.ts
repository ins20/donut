import { v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { getStreamerId } from "./users";

async function generateDefaultTitle(ctx: MutationCtx) {
  const streamerId = await getStreamerId(ctx);
  const alerts = await ctx.db
    .query("alertStyles")
    .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
    .collect();
  return `Alert${alerts.length + 1}`;
}

export const createAlertStyle = mutation({
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    const name = await generateDefaultTitle(ctx);
    return await ctx.db.insert("alertStyles", {
      name,
      streamerId,
    });
  },
});

export const getAlertStyles = query({
  args: {},
  handler: async (ctx) => {
    const streamerId = await getStreamerId(ctx);
    return await ctx.db
      .query("alertStyles")
      .withIndex("by_streamer", (q) => q.eq("streamerId", streamerId))
      .collect();
  },
});

export const updateAlertStyle = mutation({
  args: {
    id: v.id("alertStyles"),
    name: v.optional(v.string()),
    textColor: v.optional(v.string()),
    backgroundColor: v.optional(v.string()),
    duration: v.optional(v.number()),
    image: v.optional(v.string()),
    fontSize: v.optional(v.number()),
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

export const deleteAlertStyle = mutation({
  args: { id: v.id("alertStyles") },
  handler: async (ctx, args) => {
    const streamerId = await getStreamerId(ctx);
    const existingStyle = await ctx.db.get(args.id);
    if (!existingStyle || existingStyle.streamerId !== streamerId) {
      throw new Error("Стиль не найден или нет прав доступа");
    }
    return await ctx.db.delete(args.id);
  },
});
