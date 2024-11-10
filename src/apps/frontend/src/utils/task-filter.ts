import { DefaultTaskFilters, Task } from '../types/Task';
import { formatLabel } from './format-label';
import { DATE_FORMATS, TODAY, TOMORROW } from '../constants';
import { toMoment } from './date-parser';

export const isDeadlineToday = (task: Task) => {
  return toMoment(task.deadline, 12).format(DATE_FORMATS.ISO) === TODAY;
};

export const isDeadlineTomorrow = (task: Task) => {
  return toMoment(task.deadline, 12).format(DATE_FORMATS.ISO) === TOMORROW;
};

export const filterTasksByCriteria = (
  filter: DefaultTaskFilters | string | null,
  tasks: Task[]
): Task[] => {
  const isMatchingLabel = (task: Task) =>
    formatLabel(task.labels)?.name === filter;

  if (filter === DefaultTaskFilters.Today) return tasks.filter(isDeadlineToday);
  if (filter === DefaultTaskFilters.Tomorrow)
    return tasks.filter(isDeadlineTomorrow);
  if (filter === DefaultTaskFilters.Planned) return tasks;

  return filter ? tasks.filter(isMatchingLabel) : tasks;
};
