import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@/db/schema';
import { cards } from '@/db/schema';
import { reset } from 'drizzle-seed';

export async function testseed() {
  console.log('Starting Loading...');
  const db = drizzle(process.env.DATABASE_URL!);
  await reset(db, schema);
  const newCards: (typeof cards.$inferInsert)[] = [];
  const cats = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < 10; i++) {
    newCards.push({
      category: cats[i % 4],
      title: `Element ${i + 1}`,
      body: `Una grande prova\nPer un grande Risultato\nIl numero ${i + 1}`,
    });
  }
  await db.insert(cards).values(newCards);
  console.log('Load completed!');
}

if (require.main === module) {
  testseed().then();
}
