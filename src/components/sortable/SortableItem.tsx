import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';

export type ItemCard = {
  id: number;
  title: string;
  body: string;
};

export function Item({ card }: { card: ItemCard }) {
  return (
    <div className='card bg-base-200 shadow-md'>
      <div className='card-body p-4'>
        <h2 className='card-title'>{card.title}</h2>
        <p>{card.body}</p>
      </div>
    </div>
  );
}

export default function SortableItem({ id, card }: { id: UniqueIdentifier; card: ItemCard }) {
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
      <Item card={card} />
    </div>
  );
}
