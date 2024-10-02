import { PropsWithChildren } from 'react';
import { useTasks } from '../../hooks/useTasks';
import AppContext from './AppContext';

export default function AppProvider({ children }: PropsWithChildren) {
  const { tasks } = useTasks();

  return (
    <AppContext.Provider value={{ tasks }}>{children}</AppContext.Provider>
  );
}
