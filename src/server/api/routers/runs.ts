import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server/clerkClient";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const runsRouter = createTRPCRouter({
  getAllActive: publicProcedure.query(async ({ ctx }) => {
    const runs = await ctx.prisma.run.findMany({
      take: 100,
      include: {
        game: true,
      },
      where: {
        active: true,
      },
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: runs.map((run) => run.userId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return runs.map((run) => ({
      game: ctx.prisma.game.findFirst({
        where: {
          id: run.gameId,
        },
      }),
      run,
      user: users.find((user) => user.id === run.userId),
    }));
  }),
});
