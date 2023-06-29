import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.game.findFirst({
      where: {
        id: input,
      },
    });
  }),
});
