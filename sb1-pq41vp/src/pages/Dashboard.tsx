import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusCard from '../components/dashboard/StatusCard';
import RecentItem from '../components/dashboard/RecentItem';
import QuickAction from '../components/dashboard/QuickAction';

export default function Dashboard() {
  const navigate = useNavigate();
  const { isConnected, savedForms } = useApp();
  
  const recentForms = savedForms.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to FormFlow</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Create, manage, and deploy your ComfyUI workflows with ease
          </p>
        </div>
        
        <button
          onClick={() => navigate('/form-builder')}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Form
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatusCard
          title="RunPod Status"
          status={isConnected ? 'Connected' : 'Disconnected'}
          statusColor={isConnected ? 'green' : 'red'}
          icon={Zap}
        />
        <StatusCard
          title="Active Forms"
          status={`${savedForms.length} Forms`}
          statusColor="blue"
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Forms</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            {recentForms.length > 0 ? (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentForms.map((form, index) => (
                  <RecentItem
                    key={index}
                    title={form.name}
                    date={form.lastModified}
                    onClick={() => navigate(`/form-builder?id=${form.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No forms created yet. Start by creating a new form!
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <QuickAction
              title="Create New Form"
              description="Start with a blank form"
              icon={PlusCircle}
              onClick={() => navigate('/form-builder')}
            />
            <QuickAction
              title="Import Workflow"
              description="Import existing ComfyUI workflow"
              icon={Upload}
              onClick={() => navigate('/form-builder?action=import')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}