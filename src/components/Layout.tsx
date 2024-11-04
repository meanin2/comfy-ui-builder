import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isFormBuilder = location.pathname === '/form-builder';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className={`pt-16 ${isFormBuilder ? 'h-[calc(100vh-4rem)]' : ''}`}>
        {children}
      </main>
    </div>
  );
}