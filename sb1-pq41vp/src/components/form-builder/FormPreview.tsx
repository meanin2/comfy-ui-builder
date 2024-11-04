import React, { useState } from 'react';
import { FormComponent } from '../../context/FormBuilderContext';

interface FormPreviewProps {
  components: FormComponent[];
}

export default function FormPreview({ components }: FormPreviewProps) {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});

  const renderComponent = (component: FormComponent) => {
    const commonClasses = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

    switch (component.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={component.props.placeholder}
            required={component.props.required}
            className={commonClasses}
          />
        );

      case 'select':
        return (
          <select className={commonClasses}>
            {component.props.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'slider':
        const currentValue = sliderValues[component.id] ?? component.props.defaultValue;
        
        const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = Number(e.target.value);
          setSliderValues(prev => ({ ...prev, [component.id]: value }));
        };

        const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = Number(e.target.value);
          
          // Clamp the value between min and max
          value = Math.max(component.props.min, Math.min(component.props.max, value));
          
          setSliderValues(prev => ({ ...prev, [component.id]: value }));
        };

        return (
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min={component.props.min}
              max={component.props.max}
              step={component.props.step}
              value={currentValue}
              onChange={handleSliderChange}
              className="flex-1"
            />
            <input
              type="number"
              min={component.props.min}
              max={component.props.max}
              value={currentValue}
              onChange={handleNumberInput}
              className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={component.props.defaultChecked}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
          </label>
        );

      case 'checkbox':
        return (
          <input
            type="checkbox"
            defaultChecked={component.props.checked}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        );

      case 'image':
        return (
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</p>
              </div>
              <input type="file" className="hidden" accept={component.props.acceptedTypes.join(',')} />
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {components.map((component) => (
        <div key={component.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {component.label}
          </label>
          {renderComponent(component)}
        </div>
      ))}
      {components.length > 0 && (
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      )}
    </form>
  );
}