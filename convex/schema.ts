import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  donations: defineTable({
    amount: v.number(),
    message: v.string(),
    name: v.string(),
    streamerId: v.id("users"),
    goalId: v.id("goals"),
    createdAt: v.number(),
  })
    .index("by_streamer", ["streamerId"])
    .index("by_goal", ["goalId"]),
  alertStyles: defineTable({
    streamerId: v.id("users"),
    name: v.string(),
    textColor: v.optional(v.string()),
    backgroundColor: v.optional(v.string()),
    duration: v.optional(v.number()),
    image: v.optional(v.optional(v.string())),
    fontSize: v.optional(v.number()),
  }).index("by_streamer", ["streamerId"]),
  goalStyles: defineTable({
    streamerId: v.id("users"),
    name: v.string(),
    direction: v.optional(v.boolean()),
    colorFilled: v.optional(v.string()),
    colorBorder: v.optional(v.string()),
  }).index("by_streamer", ["streamerId"]),
  goals: defineTable({
    title: v.string(),
    createdAt: v.number(),
    alertStyleId: v.optional(v.id("alertStyles")),
    goalStyleId: v.optional(v.id("goalStyles")),
    collected: v.optional(v.number()),
    total: v.optional(v.number()),
    streamerId: v.id("users"),
  }).index("by_streamer", ["streamerId"]),
});

export default schema;
