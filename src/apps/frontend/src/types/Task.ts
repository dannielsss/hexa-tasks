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

export default interface ITask {
  id: string;
  name: string;
  status: TaskStatus;
  deadline: Date;
  priority: TaskPriorities;
  labels: string;
  created_at: Date;
}
