import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const runsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.run.findMany();
  }),
});
