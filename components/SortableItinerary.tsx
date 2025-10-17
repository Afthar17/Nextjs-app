import { Location } from "@/app/generated/prisma";
import { reorderLocations } from "@/lib/actions/reorderAction";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useId, useState } from "react";

interface SortableItineraryProps {
  locations: Location[];
  tripId: string;
}

export default function SortableItinerary({
  locations,
  tripId,
}: SortableItineraryProps) {
  const id = useId();
  const [localLocations, setLocalLocations] = useState(locations);
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = locations.findIndex((l) => l.id === active.id);
      const newIndex = locations.findIndex((l) => l.id === over?.id);
      const newLocations = arrayMove(localLocations, oldIndex, newIndex).map(
        (location, index) => ({
          ...location,
          order: index,
        })
      );
      setLocalLocations(newLocations);
      await reorderLocations(
        tripId,
        newLocations.map((location) => location.id)
      );
    }
  };
  return (
    <DndContext
      id={id}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localLocations.map((location) => location.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold">Destinations</h2>
          {localLocations.map((location) => (
            <SortableItineraryItem key={location.id} location={location} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

// Item
function SortableItineraryItem({ location }: { location: Location }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: location.id,
    });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className="border flex justify-between items-center rounded-lg hover:shadow-md p-4 transition-shadow duration-300 w-full"
    >
      <div>
        <h4 className="font-semibold text-sm text-gray-800">
          {location.locationTitle}
        </h4>
        <p className="text-xs text-gray-500">{`Lattitude: ${location.lat}, Longitude: ${location.lng}`}</p>
      </div>
      <div className="text-sm text-gray-500">Day {location.order + 1}</div>
    </div>
  );
}
