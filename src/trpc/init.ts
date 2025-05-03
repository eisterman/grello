import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { db } from '@/db';

// DB is imported from global so that I don't re-initialize the Pool every time a new TRPCContext is created.
// Remember that for every single TPRC Request the context function is runned again.

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  // The only reason to return DB from the context is so that then you can mock it easily
  // instead of importing the global module and needing to mock a mess.
  return { db: db };
});
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
