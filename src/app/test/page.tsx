'use client';

import { useState } from 'react';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Page() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [destroyId, setDestroyId] = useState('1');
  const { data } = useQuery(trpc.cards.list.queryOptions());
  const createMutation = useMutation(
    trpc.cards.create.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: trpc.cards.pathKey() }),
    }),
  );
  const destroyMutation = useMutation(
    trpc.cards.destroy.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries({ queryKey: trpc.cards.pathKey() });
        alert(data);
      },
    }),
  );

  function onClickCreate() {
    createMutation.mutate({ category: 'A', title: 'TEST TITLE', body: 'TEST BODY' });
  }

  function onClickDestroy() {
    destroyMutation.mutate({ id: Number(destroyId) });
  }
  return (
    <div>
      <div>
        <p>TEST</p>
        <button className='btn' onClick={onClickCreate}>
          CREATE
        </button>
        <input className='input' value={destroyId} onChange={(e) => setDestroyId(e.target.value)} />
        <button className='btn' onClick={onClickDestroy}>
          DESTROY {destroyId}
        </button>
        <p></p>
      </div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
