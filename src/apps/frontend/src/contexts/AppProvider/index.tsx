import { PropsWithChildren } from 'react';

import { useTasks } from '../../hooks/useTasks';
import { useLabels } from '../../hooks/useLabels';

import AppContext from './AppContext';
import Task from '../../types/Task';

export default function AppProvider({ children }: PropsWithChildren) {
  const { labels, onGetLabels: reloadLabels } = useLabels(true);
  const { tasks, onGetTasks: reloadTasks } = useTasks(true);

  const getFilteredTasks = (condition: (task: Task) => boolean) =>
    tasks.filter(condition);

  return (
    <AppContext.Provider
      value={{ tasks, reloadTasks, getFilteredTasks, labels, reloadLabels }}
    >
      {children}
    </AppContext.Provider>
  );
}
