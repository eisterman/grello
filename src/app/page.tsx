import type { UniqueIdentifier } from '@dnd-kit/core';
import Kanban from '@/components/Kanban';
import { Suspense } from 'react';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { db } from '@/db';

// This page uses Postgresql so if it's accidentally rendered statically the BUILD process will
// try to contact the DB and start to renderize the content based on the DB state at the build moment.
// Force-dynamic make this page impossible to be rendered statically.
export const dynamic = 'force-dynamic';

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

export default async function Home() {
  const kanban = await db.query.kanbans.findFirst();
  if (kanban === undefined) throw new Error('Missing Kanban in DB');
  prefetch(trpc.cards.list.queryOptions({ kanbanId: kanban.id }));

  return (
    <HydrateClient>
      <main className='flex items-start justify-center pt-4 pb-4 h-full'>
        <div className='flex-1 flex flex-col items-center gap-4 h-full'>
          <header className='flex flex-col items-center gap-9'>
            <div className='w-full p-4 text-center flex justify-center items-center'>
              <h2 className='text-6xl'>Grello</h2>
            </div>
          </header>
          <div className='flex flex-row justify-start items-stretch gap-8 w-screen h-full overflow-x-auto px-4 md:px-8'>
            <Suspense fallback={<div>Loading...</div>}>
              <Kanban kanbanId={kanban.id} />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
