import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

export default function Container({
  id,
  cards,
  items,
}: {
  id: UniqueIdentifier;
  cards: {
    id: number;
    body: string;
    title: string;
    kanban: number;
    category: string;
  }[];
  items: UniqueIdentifier[];
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id.toString()} items={items} strategy={verticalListSortingStrategy}>
      <div className='max-w-[90vw] w-[300px] flex-shrink-0 p-4 rounded-3xl border border-gray-200 dark:border-gray-700 flex flex-col gap-4'>
        <p className='leading-6 text-gray-700 dark:text-gray-200 text-center'>List {id}</p>
        <div ref={setNodeRef} className='flex flex-col gap-2 grow overflow-y-auto'>
          {items.map((id) => {
            const card = cards.find((c) => c.id === id);
            if (card === undefined) return <div key={id}>Error</div>;
            return <SortableItem key={id} id={id} card={card} />;
          })}
        </div>
      </div>
    </SortableContext>
  );
}
