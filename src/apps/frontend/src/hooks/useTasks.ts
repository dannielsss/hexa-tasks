import { useEffect, useState } from 'react';
import { getTasks } from '../api/ApiTasks';
import Task from '../types/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const onGetTasks = async () => {
    const responseTasks = await getTasks();
    setTasks(responseTasks);
  };

  useEffect(() => {
    onGetTasks();
  }, []);

  return { tasks };
};
