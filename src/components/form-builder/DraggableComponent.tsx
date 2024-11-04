import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';
import { FormComponent } from '../../hooks/useFormBuilder';

interface DraggableComponentProps {
  component: FormComponent;
  onSelect: () => void;
  onRemove: () => void;
  isSelected: boolean;
}

export default function DraggableComponent({
  component,
  onSelect,
  onRemove,
  isSelected,
}: DraggableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group p-4 border rounded-lg mb-4 cursor-default select-none
        ${isDragging ? 'opacity-50' : ''}
        ${isSelected ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}
        ${isDragging ? 'shadow-lg' : 'hover:shadow-sm'}
      `}
      onClick={onSelect}
    >
      <div className="flex items-center">
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {component.label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {component.type}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}