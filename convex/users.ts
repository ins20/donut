import { Id } from "./_generated/dataModel";
import { MutationCtx, query, QueryCtx } from "./_generated/server";

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return null;
    }
    return await ctx.db.get(identity.subject.split("|")[0] as Id<"users">);
  },
});

// Вспомогательная функция для получения streamerId
export async function getStreamerId(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Не авторизован");
  }
  return identity.subject.split('|')[0] as Id<"users">;
}