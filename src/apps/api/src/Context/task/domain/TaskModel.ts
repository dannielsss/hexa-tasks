import { z } from 'zod';

export enum TaskPriorities {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskStatus {
  NotStarted = 'Not started',
  InProgress = 'In progress',
  Completed = 'Completed',
}

export const TaskValdiator = z.object({
  name: z.string().min(4),
  deadline: z.string().date(),
  priority: z.nativeEnum(TaskPriorities),
});

export default interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  deadline: Date;
  priority: TaskPriorities;
  labels: string;
  created_at: Date;
}
