import { useContext, useState } from 'react';
import AppContext from '../contexts/AppProvider/AppContext';
import { createTask, getTasks } from '../api/ApiTasks';
import { Task, TaskPriorities } from '../types/Task';
import { Label } from '../types/Label';

interface TaskCreationData {
  name: string;
  deadline: string;
  priority: TaskPriorities;
  label: Label | null;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { reloadTasks } = useContext(AppContext);

  const onGetTasks = async () => {
    try {
      const responseTasks = await getTasks();
      setTasks(responseTasks);
    } catch (error) {
      console.log(error);
    }
  };

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
