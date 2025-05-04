import type { UniqueIdentifier } from '@dnd-kit/core';
import Kanban from '@/components/Kanban';
import { Suspense } from 'react';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';
import { db } from '@/db';
import { testseed } from '../../scripts/testseed';
import { revalidatePath } from 'next/cache';

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

async function seedAction() {
  'use server';
  await testseed();
  revalidatePath('/', 'page');
}

export default async function Home() {
  const items: Promise<Items> = new Promise((res) =>
    setTimeout(
      () =>
        res({
          A: [1, 2, 3],
          B: [4, 5, 6],
          C: [7, 8, 9],
          D: [],
        }),
      500,
    ),
  );
  const kanban = await db.query.kanbans.findFirst();
  if (kanban === undefined)
    return (
      <button className='btn' onClick={seedAction}>
        Reseed DB
      </button>
    );
  prefetch(trpc.cards.list.queryOptions({ kanbanId: kanban.id }));

  return (
    <HydrateClient>
      <main className='flex items-start justify-center pt-4 pb-4 h-full'>
        <div className='flex-1 flex flex-col items-center gap-4 h-full'>
          <header className='flex flex-col items-center gap-9'>
            <div className='w-[500px] max-w-[100vw] p-4 text-center flex justify-center items-center gap-8'>
              <h2 className='text-6xl'>Grello</h2>
              <button className='btn' onClick={seedAction}>
                Reseed DB
              </button>
            </div>
          </header>
          <div className='flex flex-row justify-start items-stretch gap-8 w-screen h-full overflow-x-auto px-4 md:px-8'>
            <Suspense fallback={<div>Loading...</div>}>
              <Kanban startItems={items} kanbanId={kanban.id} />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
