import { db } from "@/db";
import { users } from "@/db/schema";
import { ratelimt } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { cache } from "react";
import superjson from "superjson";

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export const createTRPCContext = cache(async () => {
  const { userId } = await auth();

  return { authId: userId };
});

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProducedure = t.procedure.use(
  async function isAuthenticated({ ctx, next }) {
    if (!ctx.authId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "You are not authenticated. Please sign in or create an account.",
      });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.authId, ctx.authId))
      .limit(1);

    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message:
          "You are not authenticated. Please sign in or create an account.",
      });
    }

    const { success } = await ratelimt.limit(user.id);

    if (!success) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please try again later.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  }
);
