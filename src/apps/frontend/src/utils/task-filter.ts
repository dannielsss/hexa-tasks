import { DefaultTaskFilters, Task } from '../types/Task';
import { formatLabel } from './format-label';

export const filterTasksByCriteria = (
  filter: DefaultTaskFilters | string | null,
  tasks: Task[]
): Task[] => {
  const today = new Date().getDate();

  const isDeadlineToday = (task: Task) =>
    new Date(task.deadline).getDate() === today;

  const isDeadlineTomorrow = (task: Task) =>
    new Date(task.deadline).getDate() === today + 1;

  const isMatchingLabel = (task: Task) =>
    formatLabel(task.labels)?.name === filter;

  if (filter === DefaultTaskFilters.Today) return tasks.filter(isDeadlineToday);
  if (filter === DefaultTaskFilters.Tomorrow)
    return tasks.filter(isDeadlineTomorrow);
  if (filter === DefaultTaskFilters.Planned) return tasks;

  return filter ? tasks.filter(isMatchingLabel) : tasks;
};
