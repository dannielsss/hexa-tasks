import { createContext } from 'react';
import Task from '../../types/Task';
import { Label } from '../../types/Label';

interface AppContextType {
  tasks: Task[];
  reloadTasks: () => Promise<void>;

  labels: Label[];
  reloadLabels: () => Promise<void>;
}

export default createContext<AppContextType>({
  tasks: [],
  async reloadTasks() {},

  labels: [],
  async reloadLabels() {},
});
