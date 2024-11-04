import React from 'react';
import { 
  Type, 
  ListOrdered, 
  Sliders, 
  Image, 
  ToggleLeft, 
  CheckSquare 
} from 'lucide-react';
import { useFormBuilder } from '../../context/FormBuilderContext';

const components = [
  { id: 'text', icon: Type, label: 'Text Input' },
  { id: 'select', icon: ListOrdered, label: 'Dropdown' },
  { id: 'slider', icon: Sliders, label: 'Slider' },
  { id: 'image', icon: Image, label: 'Image Upload' },
  { id: 'toggle', icon: ToggleLeft, label: 'Toggle' },
  { id: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
];

export default function ComponentPalette() {
  const { addComponent } = useFormBuilder();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <div className="flex flex-wrap gap-4">
        {components.map((component) => {
          const Icon = component.icon;
          return (
            <button
              key={component.id}
              onClick={() => addComponent(component.id)}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                {component.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}