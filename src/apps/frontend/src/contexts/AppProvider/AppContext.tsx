import { createContext } from 'react';
import Task from '../../types/Task';

interface AppContextType {
  tasks: Task[];
  reloadTasks: () => Promise<void>;
}

export default createContext<AppContextType>({
  tasks: [],
  async reloadTasks() {},
});
