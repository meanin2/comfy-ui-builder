import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Trash2, Edit } from 'lucide-react';
import { useApp } from '../context/AppContext';
import toast from 'react-hot-toast';

export default function SavedForms() {
  const navigate = useNavigate();
  const { savedForms, setSavedForms } = useApp();

  const handleDelete = (id: string) => {
    setSavedForms(savedForms.filter(form => form.id !== id));
    toast.success('Form deleted successfully');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Saved Forms</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your saved form templates
        </p>
      </div>

      {savedForms.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No forms</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by creating a new form
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/form-builder')}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Create new form
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {savedForms.map((form) => (
              <li key={form.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{form.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last modified: {form.lastModified}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/form-builder?id=${form.id}`)}
                      className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
                      className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}