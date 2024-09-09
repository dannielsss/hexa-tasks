import { z } from 'zod';

export default interface Task {
  id: string;
  name: string;
  status: string;
  deadline: Date;
  created_at: Date;
}

export const TaskValdiator = z.object({
  name: z.string().min(4),
  deadline: z.string().date()
})
