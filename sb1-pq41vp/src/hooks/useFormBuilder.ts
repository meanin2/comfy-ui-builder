import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface FormComponent {
  id: string;
  type: string;
  label: string;
  nodeId?: string;
  nodeParam?: string;
  props: Record<string, any>;
}

export function useFormBuilder() {
  const [components, setComponents] = useState<FormComponent[]>([]);

  const addComponent = (type: string) => {
    const newComponent: FormComponent = {
      id: uuidv4(),
      type,
      label: `New ${type}`,
      props: {},
    };
    setComponents((prev) => [...prev, newComponent]);
    return newComponent.id;
  };

  const updateComponent = (id: string, updates: Partial<FormComponent>) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const reorderComponents = (startIndex: number, endIndex: number) => {
    setComponents((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  return {
    components,
    addComponent,
    updateComponent,
    removeComponent,
    reorderComponents,
  };
}