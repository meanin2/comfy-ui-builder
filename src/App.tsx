import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import AppRoutes from './routes';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: 'bg-white dark:bg-gray-800 dark:text-white',
          }}
        />
        <Layout>
          <AppRoutes />
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;