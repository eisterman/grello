import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import SortableItem from './SortableItem';

export default function Container({
  id,
  items,
}: {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext id={id.toString()} items={items} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        className='max-w-[90vw] w-[300px] flex-shrink-0 p-4 rounded-3xl border border-gray-200 dark:border-gray-700 space-y-4'
      >
        <p className='leading-6 text-gray-700 dark:text-gray-200 text-center'>List {id}</p>
        <div className='flex flex-col gap-2'>
          {items.map((id) => (
            <SortableItem key={id} id={id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
}
