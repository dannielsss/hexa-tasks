import { useContext, useEffect, useState } from 'react';
import AppContext from '../contexts/AppProvider/AppContext';
import { createTask, getTasks } from '../api/ApiTasks';
import Task, { TaskPriorities } from '../types/Task';
import { Label } from '../types/Label';

interface TaskCreationData {
  name: string;
  deadline: string;
  priority: TaskPriorities;
  label: Label | null;
}

export const useTasks = (isWhenOpenApp?: boolean) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { reloadTasks } = useContext(AppContext);

  const onGetTasks = async () => {
    const responseTasks = await getTasks();
    setTasks(responseTasks);
  };

  useEffect(() => {
    if (isWhenOpenApp) onGetTasks();
  }, []);

  const onCreateTask = async ({
    name,
    deadline,
    priority,
    label,
  }: TaskCreationData) => {
    await createTask({
      name,
      deadline,
      priority,
      label,
    });

    await reloadTasks();
  };

  return { tasks, onGetTasks, onCreateTask };
};
