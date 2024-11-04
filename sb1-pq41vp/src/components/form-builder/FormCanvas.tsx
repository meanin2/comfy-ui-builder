import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormBuilder } from '../../context/FormBuilderContext';
import DraggableComponent from './DraggableComponent';
import FormPreview from './FormPreview';

export default function FormCanvas() {
  const {
    components,
    selectedComponentId,
    selectComponent,
    removeComponent,
    reorderComponents,
  } = useFormBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((comp) => comp.id === active.id);
      const newIndex = components.findIndex((comp) => comp.id === over.id);
      reorderComponents(oldIndex, newIndex);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Form Structure</h3>
        {components.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Drag components here to build your form
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {components.map((component) => (
                <DraggableComponent
                  key={component.id}
                  component={component}
                  onSelect={() => selectComponent(component.id)}
                  onRemove={() => removeComponent(component.id)}
                  isSelected={component.id === selectedComponentId}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
        <FormPreview components={components} />
      </div>
    </div>
  );
}