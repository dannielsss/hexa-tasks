import { PropsWithChildren, useEffect, useState } from 'react';

import { useTasks } from '../../hooks/useTasks';
import { useLabels } from '../../hooks/useLabels';

import AppContext from './AppContext';

export default function AppProvider({ children }: PropsWithChildren) {
  const { labels, onGetLabels: reloadLabels } = useLabels();
  const { tasks, onGetTasks: reloadTasks } = useTasks();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    reloadTasks();
    reloadLabels();
  }, []);

  return (
    <AppContext.Provider
      value={{ tasks, reloadTasks, labels, reloadLabels, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  );
}
