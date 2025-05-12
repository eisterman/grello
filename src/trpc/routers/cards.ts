import { createTRPCRouter, baseProcedure } from '../init';
import { cards } from '@/db/schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';

export const cardsRouter = createTRPCRouter({
  list: baseProcedure.query(async (opts) => {
    return await opts.ctx.db.query.cards.findMany({
      orderBy: (cards, { asc }) => asc(cards.id),
    });
  }),
  retrieve: baseProcedure.input(z.object({ id: z.number().gt(0) })).query(async (opts) => {
    const card = await opts.ctx.db.query.cards.findFirst({ where: eq(cards.id, opts.input.id) });
    if (card === undefined) throw new TRPCError({ code: 'NOT_FOUND' });
    return card;
  }),
  create: baseProcedure.input(createInsertSchema(cards)).mutation(async (opts) => {
    return await opts.ctx.db.insert(cards).values(opts.input).returning();
  }),
  update: baseProcedure
    .input(
      z.object({
        id: z.number().gt(0),
        payload: createUpdateSchema(cards),
      }),
    )
    .mutation(async (opts) => {
      const qres = await opts.ctx.db
        .update(cards)
        .set(opts.input.payload)
        .where(eq(cards.id, opts.input.id));
      if (qres.rowCount === null) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      if (qres.rowCount === 0)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Object updated doesn't exists",
        });
      return qres.rowCount;
    }),
  destroy: baseProcedure.input(z.object({ id: z.number().gt(0) })).mutation(async (opts) => {
    const qres = await opts.ctx.db.delete(cards).where(eq(cards.id, opts.input.id));
    if (qres.rowCount === null) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    if (qres.rowCount === 0)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: "Cannot delete object that doesn't exists",
      });
    return qres.rowCount;
  }),
});
