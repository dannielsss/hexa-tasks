import RequestError from '../errors/RequestError';
import { Label } from '../types/Label';
import { TaskPriorities, Task } from '../types/Task';

interface NewTaskPayload {
  name: string;
  deadline: string;
  priority: TaskPriorities;
  label: Label | null;
}

interface TaskCompletionPayload {
  taskId: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const request = await fetch('http://localhost:5000/api/tasks');
  const response = await request.json();
  const tasks = response.data;

  return tasks;
};

export const createTask = async ({
  name,
  deadline,
  priority,
  label,
}: NewTaskPayload): Promise<void> => {
  const request = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    body: JSON.stringify({
      name,
      deadline,
      priority,
      labelId: label && label.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await request.json();
  if (!request.ok)
    throw new RequestError('POST /tasks', data.message as Array<string>);
};

export const removeTask = async (taskId: string): Promise<void> => {
  await fetch('http://localhost:5000/api/tasks/' + taskId, {
    method: 'DELETE',
  });
};

export const changeTaskStatus = async ({ taskId }: TaskCompletionPayload) => {
  await fetch(`http://localhost:5000/api/tasks/${taskId}/complete`, {
    method: 'PUT',
  });
};
