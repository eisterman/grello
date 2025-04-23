import type { Route } from './+types/home';
import AppCard from '@/components/card/appcard';
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import _ from 'lodash';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Grello Test Dashboard' },
    { name: 'description', content: 'First MVP for Grello!' },
  ];
}

export default function Home() {
  const [items, setItems] = useState<number[]>(_.range(5));
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null) {
      console.warn('handleDragEnd: Over is Null');
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(Number(active.id));
        const newIndex = items.indexOf(Number(over.id));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <main className='flex items-start justify-center pt-4 pb-4 h-full'>
        <div className='flex-1 flex flex-col items-center gap-4 h-full'>
          <header className='flex flex-col items-center gap-9'>
            <div className='w-[500px] max-w-[100vw] p-4 text-center'>
              <h2 className='text-6xl'>Grello</h2>
            </div>
          </header>
          <div className='grid grid-cols-5 w-full h-full'>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className='max-w-[300px] w-full space-y-6 px-4 h-full'>
                <div className='h-full rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4'>
                  <p className='leading-6 text-gray-700 dark:text-gray-200 text-center'>
                    List Test
                  </p>
                  <ul className='flex flex-col gap-2'>
                    {items.map((id) => (
                      <li key={id}>
                        <AppCard id={id} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SortableContext>
          </div>
        </div>
      </main>
    </DndContext>
  );
}
