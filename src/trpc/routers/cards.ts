import { createTRPCRouter, baseProcedure } from '../init';
// import { z } from 'zod';

export const cardsRouter = createTRPCRouter({
  // TODO: Add kanban_id param
  list: baseProcedure.query(async (opts) => {
    await new Promise((res) => setTimeout(res, 500));
    return await opts.ctx.db.query.cards.findMany();
  }),
});
