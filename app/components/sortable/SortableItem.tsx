import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';

export function Item({ id }: { id: UniqueIdentifier }) {
  return (
    <div className='rounded-3xl border border-gray-200 dark:border-gray-700 bg-primary min-h-12 flex flex-col justify-center'>
      <p className='text-center'>ELEMENT {id}</p>
    </div>
  );
}

export default function SortableItem({ id }: { id: UniqueIdentifier }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={`${isDragging && 'grayscale-50'}`}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Item id={id} />
    </div>
  );
}
