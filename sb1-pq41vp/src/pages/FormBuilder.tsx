import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FormBuilderProvider } from '../context/FormBuilderContext';
import WorkflowPanel from '../components/form-builder/WorkflowPanel';
import FormCanvas from '../components/form-builder/FormCanvas';
import PropertiesPanel from '../components/form-builder/PropertiesPanel';
import ComponentPalette from '../components/form-builder/ComponentPalette';

export default function FormBuilder() {
  const [searchParams] = useSearchParams();
  const formId = searchParams.get('id');
  const importAction = searchParams.get('action') === 'import';

  return (
    <FormBuilderProvider>
      <div className="h-full flex">
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <WorkflowPanel importAction={importAction} />
        </div>

        <div className="flex-1 flex flex-col">
          <ComponentPalette />
          <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
            <FormCanvas />
          </div>
        </div>

        <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <PropertiesPanel />
        </div>
      </div>
    </FormBuilderProvider>
  );
}