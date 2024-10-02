import { createContext } from 'react';
import Task from '../../types/Task';

interface AppContextType {
  tasks: Task[];
}

export default createContext<AppContextType>({
  tasks: [],
});
