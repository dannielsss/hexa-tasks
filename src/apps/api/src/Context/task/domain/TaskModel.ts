import { z } from 'zod';

export enum Priorities {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
};

export const TaskValdiator = z.object({
  name: z.string().min(4),
  deadline: z.string().date(),
  priority: z.nativeEnum(Priorities),
});

export default interface Task {
  id: string;
  name: string;
  status: string;
  deadline: Date;
  priority: Priorities;
  labels: string;
  created_at: Date;
};
