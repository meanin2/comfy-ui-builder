import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  status: string;
  statusColor: 'green' | 'red' | 'blue' | 'yellow';
  icon: LucideIcon;
}

const statusColorMap = {
  green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
};

export default function StatusCard({ title, status, statusColor, icon: Icon }: StatusCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusColorMap[statusColor]}`}>
        {status}
      </div>
    </div>
  );
}