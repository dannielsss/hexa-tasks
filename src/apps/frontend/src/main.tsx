import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import 'react-day-picker/style.css';
import './styles.scss';

import AppProvider from './contexts/AppProvider/index.tsx';
import Router from './components/Router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <Router />
    </AppProvider>
  </StrictMode>
);
