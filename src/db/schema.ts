import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

// export const kanbans = pgTable('kanbans', {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
// });

export const cards = pgTable('cards', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  // kanban: integer('kanban_id')
  //   .notNull()
  //   .references(() => kanbans.id),
  category: varchar().notNull(),
  title: varchar().notNull(),
  body: text().notNull(),
});
