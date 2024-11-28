import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthSessionId } from "@convex-dev/auth/server";

export const getAuthUser = query({
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);

    if (!sessionId) return null;

    const session = await ctx.db.get(sessionId);
    if (!session) return null;

    const user = await ctx.db.get(session.userId);
    const firstname = user?.name?.split(" ")[0];
    const lastname = user?.name?.split(" ")[1];

    return { firstname, lastname, ...user };
  },
});
