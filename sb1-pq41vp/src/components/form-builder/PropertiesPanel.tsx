import React from 'react';
import { X } from 'lucide-react';
import { useFormBuilder, FormComponent } from '../../context/FormBuilderContext';
import { useApp } from '../../context/AppContext';

interface PropertyFieldProps {
  label: string;
  children: React.ReactNode;
}

interface WorkflowNode {
  inputs: Record<string, any>;
  class_type: string;
  _meta?: {
    title: string;
  };
}

function PropertyField({ label, children }: PropertyFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function PropertiesPanel() {
  const { workflow } = useApp();
  const { components, selectedComponentId, updateComponent, selectComponent } = useFormBuilder();
  const component = components.find((c) => c.id === selectedComponentId);

  const handleChange = (field: keyof FormComponent | string, value: any) => {
    if (field.startsWith('props.')) {
      const propName = field.split('.')[1];
      updateComponent(component!.id, {
        props: { ...component!.props, [propName]: value },
      });
    } else {
      updateComponent(component!.id, { [field]: value });
    }
  };

  const getNodeLabel = (nodeId: string, node: WorkflowNode) => {
    return `${nodeId} - ${node._meta?.title || node.class_type}`;
  };

  const renderNodeSelection = () => {
    if (!workflow) return null;

    const selectedNode = component?.nodeId ? workflow[component.nodeId] as WorkflowNode : null;

    return (
      <>
        <PropertyField label="Node">
          <select
            value={component?.nodeId || ''}
            onChange={(e) => {
              handleChange('nodeId', e.target.value);
              // Clear the input selection when node changes
              handleChange('nodeInput', '');
            }}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a node</option>
            {Object.entries(workflow).map(([id, node]) => (
              <option key={id} value={id}>
                {getNodeLabel(id, node as WorkflowNode)}
              </option>
            ))}
          </select>
        </PropertyField>

        {selectedNode && (
          <PropertyField label="Node Input">
            <select
              value={component?.nodeInput || ''}
              onChange={(e) => handleChange('nodeInput', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select an input</option>
              {Object.keys(selectedNode.inputs).map((input) => (
                <option key={input} value={input}>
                  {input}
                </option>
              ))}
            </select>
          </PropertyField>
        )}
      </>
    );
  };

  const renderComponentSpecificFields = () => {
    switch (component?.type) {
      case 'text':
        return (
          <>
            <PropertyField label="Placeholder">
              <input
                type="text"
                value={component.props.placeholder || ''}
                onChange={(e) => handleChange('props.placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
            <PropertyField label="Required">
              <input
                type="checkbox"
                checked={component.props.required || false}
                onChange={(e) => handleChange('props.required', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
              />
            </PropertyField>
          </>
        );

      case 'select':
        return (
          <PropertyField label="Options (one per line)">
            <textarea
              value={component.props.options?.join('\n') || ''}
              onChange={(e) => handleChange('props.options', e.target.value.split('\n').filter(Boolean))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
            />
          </PropertyField>
        );

      case 'slider':
        return (
          <>
            <PropertyField label="Min Value">
              <input
                type="number"
                value={component.props.min}
                onChange={(e) => handleChange('props.min', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
            <PropertyField label="Max Value">
              <input
                type="number"
                value={component.props.max}
                onChange={(e) => handleChange('props.max', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
            <PropertyField label="Step">
              <input
                type="number"
                value={component.props.step}
                onChange={(e) => handleChange('props.step', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
            <PropertyField label="Default Value">
              <input
                type="number"
                value={component.props.defaultValue}
                onChange={(e) => handleChange('props.defaultValue', Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
          </>
        );

      case 'toggle':
      case 'checkbox':
        return (
          <PropertyField label="Default State">
            <input
              type="checkbox"
              checked={component.props.defaultChecked || false}
              onChange={(e) => handleChange('props.defaultChecked', e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-indigo-600"
            />
          </PropertyField>
        );

      case 'image':
        return (
          <>
            <PropertyField label="Max Size (MB)">
              <input
                type="number"
                value={component.props.maxSize / 1048576}
                onChange={(e) => handleChange('props.maxSize', Number(e.target.value) * 1048576)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </PropertyField>
          </>
        );

      default:
        return null;
    }
  };

  if (!component) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Select a component to edit its properties
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Properties</h2>
        <button
          onClick={() => selectComponent(null)}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <PropertyField label="Label">
          <input
            type="text"
            value={component.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </PropertyField>

        {renderNodeSelection()}
        {renderComponentSpecificFields()}
      </div>
    </div>
  );
}