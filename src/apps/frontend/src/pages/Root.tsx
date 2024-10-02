import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { useTasks } from '../hooks/useTasks';
import TaskList from '../components/tasks/TaskList';

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
  const { tasks } = useTasks();

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
