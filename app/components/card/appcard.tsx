import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';

export default function AppCard({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className='rounded-3xl border border-gray-200 dark:border-gray-700 text-center text-wrap'
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className='m-4'>ELEMENT {id}</div>
    </div>
  );
}
