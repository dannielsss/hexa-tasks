import Task from '../types/Task';

export const getTasks = async (): Promise<Task[]> => {
  const request = await fetch('http://localhost:5000/api/tasks');
  const response = await request.json();
  const tasks = response.data;

  return tasks;
};
