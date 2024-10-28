import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';

import { DefaultTaskFilters } from '../types/Task';

import { filterTasksByCriteria } from '../utils/task-filter';
import AppContext from '../contexts/AppProvider/AppContext';
import AppLayout from '../components/common/AppLayout';
import TaskList from '../components/tasks/TaskList';

interface LoaderData {
  filter_tasks: DefaultTaskFilters | string | null;
}

export async function loaderRoot({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const filter_tasks = url.searchParams.get('filter');

  return { filter_tasks };
}

export default function Root() {
  const { filter_tasks } = useLoaderData() as LoaderData;
  const { tasks } = useContext(AppContext);
  const filteredTasks = filterTasksByCriteria(filter_tasks, tasks);

  return (
    <AppLayout>
      <p>
        {/* Use .length isn't recomend */}
        {filteredTasks.length > 0 ? filteredTasks.length : '0'} {filter_tasks}{' '}
        task(s)
      </p>

      {tasks.length > 0 ? <TaskList tasks={filteredTasks} /> : null}

      {/* <p style={{ marginBottom: '3rem' }}>Click here to show completed tasks</p> */}
    </AppLayout>
  );
}
