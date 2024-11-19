import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from 'providers/AppProvider';
import { router } from 'routes';
import 'helpers/initFA';
import AuthProvider from 'providers/AuthProvider';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  </React.StrictMode>
);
