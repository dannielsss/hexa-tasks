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

export interface InputTaskSchema {
  name: string;
}

export default interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  deadline: Date;
  priority: TaskPriorities;
  labels: string;
  created_at: Date;
}
