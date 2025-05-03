import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const kanbanT = pgTable('kanban', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});

export const cardT = pgTable('card', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  kanban: integer('kanban_id')
    .notNull()
    .references(() => kanbanT.id),
  title: varchar().notNull(),
  body: text().notNull(),
});
