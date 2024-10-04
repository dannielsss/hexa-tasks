import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';

import AppContext from '../contexts/AppProvider/AppContext';
import TaskList from '../components/tasks/TaskList';
import AppLayout from '../components/common/AppLayout';

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
  const { tasks } = useContext(AppContext);

  return (
    <AppLayout>
      <p>
        {/* Use .length isn't recomend */}
        {tasks.length > 0 ? tasks.length : '0'} {filter_tasks} task(s)
      </p>
      {tasks.length > 0 && <TaskList tasks={tasks} />}

      <p style={{ marginBottom: '3rem' }}>Click here to show completed tasks</p>
    </AppLayout>
  );
}
