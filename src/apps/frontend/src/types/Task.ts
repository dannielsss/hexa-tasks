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

export enum DefaultTaskFilters {
  Planned = 'planned',
  Tomorrow = 'tomorrow',
  Today = 'today',
}

export interface InputTaskSchema {
  name: string;
}

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
  deadline: Date;
  priority: TaskPriorities;
  labels: string;
  created_at: Date;
}
