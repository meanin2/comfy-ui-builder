import React from 'react';
import { ImageIcon, Download } from 'lucide-react';

export default function Gallery() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gallery</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          View and manage your generated images
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example gallery items - replace with actual data */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Generated Image {item}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created on March {item}, 2024
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}