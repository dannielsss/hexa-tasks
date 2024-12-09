import { API_URL } from '../constants';
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
  const request = await fetch(`${API_URL}/tasks`);
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
  const request = await fetch(`${API_URL}/tasks`, {
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
  await fetch(`${API_URL}/tasks/` + taskId, {
    method: 'DELETE',
  });
};

export const changeTaskStatus = async ({ taskId }: TaskCompletionPayload) => {
  await fetch(`${API_URL}/tasks/${taskId}/complete`, {
    method: 'PUT',
  });
};
