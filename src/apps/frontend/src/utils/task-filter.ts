import moment from 'moment-timezone';
import { DefaultTaskFilters, Task } from '../types/Task';
import { formatLabel } from './format-label';
import { TIME_ZONE } from '../constants';

const today = moment()
  .tz(TIME_ZONE)
  .set('hours', 0)
  .set('minutes', 0)
  .set('seconds', 0)
  .set('milliseconds', 0);

const tomorrow = today.clone().add(1, 'day');

export const isDeadlineToday = (task: Task) => {
  console.log(`Today is:`, today.toISOString());
  console.log(`Deadline of '${task.name}':`, task.deadline);

  return task.deadline === today.toISOString();
};

export const isDeadlineTomorrow = (task: Task) => {
  return moment(task.deadline).isSame(tomorrow);
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
