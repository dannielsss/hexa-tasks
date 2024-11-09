import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { useContext } from 'react';

import { DefaultTaskFilters } from '../types/Task';
import { TIME_ZONE } from '../constants';

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
      <p className="text-sm">
        <b>Time zone: </b> {TIME_ZONE}
      </p>
      <p>
        {filteredTasks.length} {filter_tasks && filter_tasks} task(s)
      </p>

      <TaskList tasks={filteredTasks} />
    </AppLayout>
  );
}
