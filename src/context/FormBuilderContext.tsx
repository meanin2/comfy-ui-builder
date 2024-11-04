import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface FormComponent {
  id: string;
  type: string;
  label: string;
  nodeId?: string;
  nodeInput?: string;
  props: Record<string, any>;
}

interface FormBuilderContextType {
  components: FormComponent[];
  selectedComponentId: string | null;
  addComponent: (type: string) => void;
  updateComponent: (id: string, updates: Partial<FormComponent>) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (startIndex: number, endIndex: number) => void;
  selectComponent: (id: string | null) => void;
}

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export function FormBuilderProvider({ children }: { children: React.ReactNode }) {
  const [components, setComponents] = useState<FormComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const addComponent = (type: string) => {
    const newComponent: FormComponent = {
      id: uuidv4(),
      type,
      label: `New ${type}`,
      props: getDefaultProps(type),
    };
    setComponents((prev) => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
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
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const reorderComponents = (startIndex: number, endIndex: number) => {
    setComponents((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  const selectComponent = (id: string | null) => {
    setSelectedComponentId(id);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        components,
        selectedComponentId,
        addComponent,
        updateComponent,
        removeComponent,
        reorderComponents,
        selectComponent,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const context = useContext(FormBuilderContext);
  if (context === undefined) {
    throw new Error('useFormBuilder must be used within a FormBuilderProvider');
  }
  return context;
}

function getDefaultProps(type: string): Record<string, any> {
  switch (type) {
    case 'text':
      return { placeholder: '', required: false };
    case 'select':
      return { options: ['Option 1', 'Option 2', 'Option 3'] };
    case 'slider':
      return { min: 0, max: 100, step: 1, defaultValue: 50 };
    case 'toggle':
      return { defaultChecked: false };
    case 'checkbox':
      return { checked: false };
    case 'image':
      return { maxSize: 5242880, acceptedTypes: ['image/jpeg', 'image/png'] };
    default:
      return {};
  }
}