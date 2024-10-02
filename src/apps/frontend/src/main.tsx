import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles.scss';

import Root, { loaderRoot } from './pages/Root.tsx';
import AppProvider from './contexts/AppProvider/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: loaderRoot,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
