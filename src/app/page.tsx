import Kanban from '@/components/Kanban';
import { Suspense } from 'react';
import { HydrateClient, prefetch, trpc } from '@/trpc/server';

// This page uses Postgresql so if it's accidentally rendered statically the BUILD process will
// try to contact the DB and start to renderize the content based on the DB state at the build moment.
// Force-dynamic make this page impossible to be rendered statically.
export const dynamic = 'force-dynamic';

export default async function Home() {
  prefetch(trpc.cards.list.queryOptions());

  return (
    <HydrateClient>
      <main className='flex items-start justify-center h-full'>
        <div className='flex-1 flex flex-col items-center gap-4 h-full'>
          <div className='navbar bg-base-200 shadow-sm'>
            <div className='navbar-start'>
              <button className='btn btn-ghost text-xl'>Grello Test</button>
            </div>
            <div className='navbar-end'>
              <button className='btn btn-success'>Create</button>
            </div>
          </div>
          <div className='flex flex-row justify-start items-stretch gap-8 w-screen h-full overflow-x-auto px-4 md:px-8 pb-4'>
            <Suspense fallback={<div>Loading...</div>}>
              <Kanban />
            </Suspense>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
