import { createContext, Dispatch, SetStateAction } from 'react';
import { Label } from '../../types/Label';
import { Task } from '../../types/Task';

interface AppContextType {
  tasks: Task[];
  reloadTasks: () => Promise<void>;

  labels: Label[];
  reloadLabels: () => Promise<void>;

  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default createContext<AppContextType>({
  tasks: [],
  async reloadTasks() {},

  labels: [],
  async reloadLabels() {},

  loading: false,
  setLoading: () => {},
});
