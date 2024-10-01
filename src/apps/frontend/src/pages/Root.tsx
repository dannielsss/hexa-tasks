import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getTasks } from '../api/ApiTasks';
import { useEffect, useState } from 'react';

import TaskList from '../components/tasks/TaskList';
import ITask from '../types/Task';

interface LoaderData {
  filter_tasks: string;
}

export async function loaderRoot({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const filter_tasks = url.searchParams.get('filter');
  console.log(filter_tasks);

  return { filter_tasks: filter_tasks || '' };
}

export default function Root() {
  const { filter_tasks } = useLoaderData() as LoaderData;
  const [tasks, setTasks] = useState<ITask[] | null>(null);

  const onGetTasks = async () => {
    const responseTasks = await getTasks();
    setTasks(responseTasks);
  };

  useEffect(() => {
    onGetTasks();
  }, []);

  return (
    <>
      <p>
        {tasks ? tasks.length : '...'} {filter_tasks} task(s)
      </p>
      {tasks && <TaskList tasks={tasks} />}

      <p style={{ marginBottom: '3rem' }}>Click here to show completed tasks</p>
    </>
  );
}
