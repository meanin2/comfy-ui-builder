import React from 'react';
import { ChevronRight } from 'lucide-react';

interface RecentItemProps {
  title: string;
  date: string;
  onClick: () => void;
}

export default function RecentItem({ title, date, onClick }: RecentItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
    >
      <div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Last modified: {date}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}