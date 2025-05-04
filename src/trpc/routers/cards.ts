import { createTRPCRouter, baseProcedure } from '../init';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

const kanbanProcedure = baseProcedure
  .input(z.object({ kanbanId: z.number() }))
  .use(async function (opts) {
    const kanban = await opts.ctx.db.query.kanbans.findFirst({
      where: (kanban, { eq }) => eq(kanban.id, opts.input.kanbanId),
    });
    if (kanban == undefined) throw new TRPCError({ code: 'NOT_FOUND' });
    return opts.next({
      ctx: {
        kanban,
      },
    });
  });

export const cardsRouter = createTRPCRouter({
  list: kanbanProcedure.query(async (opts) => {
    // await new Promise((res) => setTimeout(res, 500));
    return await opts.ctx.db.query.cards.findMany({
      where: (card, { eq }) => eq(card.kanban, opts.ctx.kanban.id),
      orderBy: (cards, { asc }) => asc(cards.id),
    });
  }),
});
