import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { cardsRouter } from '@/trpc/routers/cards';

export const appRouter = createTRPCRouter({
  cards: cardsRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
