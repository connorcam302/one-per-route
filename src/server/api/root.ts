import { runsRouter } from "~/server/api/routers/runs";
import { gameRouter } from "~/server/api/routers/games";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  runs: runsRouter,
  games: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
