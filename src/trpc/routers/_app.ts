import {
  baseProcedure,
  createTRPCRouter,
  protectedProducedure,
} from "@/trpc/init";
import z from "zod";

export const appRouter = createTRPCRouter({
  hello: protectedProducedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      console.log(opts.ctx.user);

      return {
        greeting: `Hello ${opts.ctx.user.name}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
