import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, Globe, Sliders, Shield, Bell } from 'lucide-react';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your application preferences
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isDark ? (
                <Moon className="h-5 w-5 text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-400" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{
                backgroundColor: isDark ? '#4F46E5' : '#E5E7EB'
              }}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className="pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                style={{
                  transform: isDark ? 'translateX(1.25rem)' : 'translateX(0)'
                }}
              />
            </button>
          </div>
        </div>

        {[
          { icon: Globe, title: 'Language', description: 'Choose your preferred language' },
          { icon: Sliders, title: 'API Settings', description: 'Configure API endpoints and keys' },
          { icon: Shield, title: 'Privacy', description: 'Manage your privacy settings' },
          { icon: Bell, title: 'Notifications', description: 'Configure notification preferences' }
        ].map((setting, index) => (
          <div key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <setting.icon className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {setting.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {setting.description}
                  </p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}