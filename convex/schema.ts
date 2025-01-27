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
    createdAt: v.number(),
  }).index("by_streamer", ["streamerId"]),
});

export default schema;
