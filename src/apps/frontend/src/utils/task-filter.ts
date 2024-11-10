import { DefaultTaskFilters, Task } from '../types/Task';
import { formatLabel } from './format-label';
import { DATE_FORMATS, TODAY, TOMORROW } from '../constants';
import { toMoment } from './date-parser';

/**
 * Checks if the task's deadline is today.
 *
 * @param task The task to check.
 * @returns True if the task's deadline is today, false otherwise.
 */
export const isDeadlineToday = (task: Task) => {
  return toMoment(task.deadline, 12).format(DATE_FORMATS.ISO) === TODAY;
};

/**
 * Checks if the task's deadline is tomorrow.
 *
 * @param task The task to check.
 * @returns True if the task's deadline is tomorrow, false otherwise.
 */
export const isDeadlineTomorrow = (task: Task) => {
  return toMoment(task.deadline, 12).format(DATE_FORMATS.ISO) === TOMORROW;
};

/**
 * Returns a list of tasks based on the given filter.
 *
 * @param filter The filter to apply to the tasks.
 * @param tasks The list of tasks to filter.
 * @returns A filtered list of tasks.
 */
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
