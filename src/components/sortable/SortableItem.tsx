import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';

export function Item({ id }: { id: UniqueIdentifier }) {
  return (
    <div className='card bg-base-200 shadow-md'>
      <div className='card-body p-4'>
        <h2 className='card-title'>Element {id}</h2>
        <p>
          Content for this card, I will have this very long so that I can verify overflow and other
          particularities of the component.
        </p>
      </div>
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
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      className={`${isDragging && 'contrast-75'}`}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Item id={id} />
    </div>
  );
}
