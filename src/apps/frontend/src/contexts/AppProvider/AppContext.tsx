import { createContext } from 'react';
import { Label } from '../../types/Label';
import Task from '../../types/Task';

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
