import { useEffect, useState } from 'react';
import { getTasks } from '../api/ApiTasks';
import Task from '../types/Task';

export const useTasks = (isWhenOpenApp?: boolean) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const onGetTasks = async () => {
    const responseTasks = await getTasks();
    setTasks(responseTasks);
  };

  useEffect(() => {
    if (isWhenOpenApp) onGetTasks();
  }, []);

  return { tasks, onGetTasks };
};
