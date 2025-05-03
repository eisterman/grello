import type { Route } from './+types/home';
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
  type Announcements,
  type DragStartEvent,
  type DragOverEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ClientOnly } from 'remix-utils/client-only';
import { Item } from '@/components/sortable/SortableItem';
import Container from '@/components/sortable/Container';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'Grello Test Dashboard' },
    { name: 'description', content: 'First MVP for Grello!' },
  ];
}

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>;

export async function loader(_params: Route.LoaderArgs) {
  const items: Items = {
    A: [1, 2, 3],
    B: [4, 5, 6],
    C: [7, 8, 9],
    D: [],
  };
  return items;
}

const announcements: Announcements = {
  onDragStart({ active }): undefined {
    console.log(`Picked up draggable item ${active.id}.`);
  },
  onDragOver({ active, over }): undefined {
    if (over !== null) {
      console.log(`Draggable item ${active.id} was moved over droppable area ${over.id}.`);
      return;
    }
    console.log(`Draggable item ${active.id} is no longer over a droppable area.`);
  },
  onDragEnd({ active, over }): undefined {
    if (over !== null) {
      console.log(`Draggable item ${active.id} was dropped over droppable area ${over.id}`);
      return;
    }
    console.log(`Draggable item ${active.id} was dropped.`);
  },
  onDragCancel(id): undefined {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const [items, setItems] = useState<Items>(() => loaderData);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function findContainer(id: UniqueIdentifier): UniqueIdentifier | null {
    if (id in items) {
      return id;
    }
    return Object.keys(items).find((key) => items[key].includes(id)) ?? null;
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (over === null) return; // QUESTION: || active.id in items
    // Variables to reduce Object lookup on active and over
    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    // I don't need to move in DragOver inside the same container
    if (activeContainer === null || overContainer === null || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(activeId);
      const overIndex = overItems.indexOf(overId);

      let newIndex: number;
      if (overId in prev) {
        // We're at the root droppable of a container (like the bg of the List)
        newIndex = overItems.length + 1;
      } else {
        /*
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top >
            over.rect.top + over.rect.height;
        */
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        // QUESTION: Serve davvero il check su overIndex?
        //  Nell'esempio ufficiale dnd-kit e' assente.
        const isBelowLastItem = overIndex === overItems.length - 1 && isBelowOverItem;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      // recentlyMovedToNewContainer.current = true;

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((item) => item !== active.id)],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over === null) return; // QUESTION: || active.id in items
    // Variables to reduce Object lookup on active and over
    const activeId = active.id;
    const overId = over.id;

    // Find the containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    // I need to move in DragEnd ONLY inside the same container!!!
    if (activeContainer === null || overContainer === null || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }

  return (
    <main className='flex items-start justify-center pt-4 pb-4 h-full'>
      <div className='flex-1 flex flex-col items-center gap-4 h-full'>
        <header className='flex flex-col items-center gap-9'>
          <div className='w-[500px] max-w-[100vw] p-4 text-center'>
            <h2 className='text-6xl'>Grello</h2>
          </div>
        </header>
        <div className='flex flex-row justify-start items-stretch gap-8 w-screen h-full overflow-scroll px-4 md:px-8'>
          {/* ClientOnly is needed because for reasons the aria-attr go HydrationError (sob)*/}
          <ClientOnly fallback={<div>Loading...</div>}>
            {() => (
              <DndContext
                accessibility={{ announcements }}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <Container id='A' items={items.A} />
                <div className='divider divider-horizontal mx-0'></div>
                <Container id='B' items={items.B} />
                <Container id='C' items={items.C} />
                <Container id='D' items={items.D} />
                <DragOverlay>
                  {activeId ?
                    <Item id={activeId} />
                  : null}
                </DragOverlay>
              </DndContext>
            )}
          </ClientOnly>
        </div>
      </div>
    </main>
  );
}
