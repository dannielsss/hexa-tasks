import moment from 'moment-timezone';
import { DefaultTaskFilters, Task } from '../types/Task';
import { formatLabel } from './format-label';
import { TIME_ZONE } from '../constants';

const today = moment().tz(TIME_ZONE);

export const isDeadlineToday = (task: Task) =>
  moment(task.deadline).tz(TIME_ZONE).format('DD/MM/YYYY') ===
  today.format('DD/MM/YYYY');

export const isDeadlineTomorrow = (task: Task) =>
  moment(task.deadline).tz(TIME_ZONE).isAfter(today);

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
