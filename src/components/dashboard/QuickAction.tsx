import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function QuickAction({ title, description, icon: Icon, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow flex items-start space-x-4"
    >
      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </button>
  );
}