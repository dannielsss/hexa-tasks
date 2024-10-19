import { PropsWithChildren } from 'react';
import { useTasks } from '../../hooks/useTasks';
import AppContext from './AppContext';
import { useLabels } from '../../hooks/useLabels';

export default function AppProvider({ children }: PropsWithChildren) {
  const { labels, onGetLabels: reloadLabels } = useLabels(true);
  const { tasks, onGetTasks: reloadTasks } = useTasks(true);

  return (
    <AppContext.Provider value={{ tasks, reloadTasks, labels, reloadLabels }}>
      {children}
    </AppContext.Provider>
  );
}
