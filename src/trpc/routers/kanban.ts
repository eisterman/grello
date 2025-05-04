import { createTRPCRouter, baseProcedure } from '../init';
// import { z } from 'zod';

export const kanbanRouter = createTRPCRouter({
  // create: baseProcedure
  //   .input(
  //     z.object({
  //       title: z.string(),
  //     }),
  //   )
  //   .mutation((opts) => {
  //     // const { input } = opts;
  //     //
  //     // const input: {
  //     //   title: string;
  //     // };
  //     // [...]
  //   }),
  list: baseProcedure.query(async ({ ctx: { db } }) => {
    return await db.query.kanbans.findMany({
      orderBy: (kanbans, { asc }) => [asc(kanbans.id)],
    });
  }),
});
