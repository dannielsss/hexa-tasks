import { PropsWithChildren } from 'react';
import { useTasks } from '../../hooks/useTasks';
import AppContext from './AppContext';

export default function AppProvider({ children }: PropsWithChildren) {
  const { tasks, onGetTasks: reloadTasks } = useTasks(true);

  return (
    <AppContext.Provider value={{ tasks, reloadTasks }}>
      {children}
    </AppContext.Provider>
  );
}
