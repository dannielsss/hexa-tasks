import Task, { TaskPriorities, TaskStatus } from './TaskModel';

export default interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(taskId: string): Promise<Task>;
  create(
    name: string,
    deadline: string,
    priority: TaskPriorities
  ): Promise<Task>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string, deadline: string): Promise<void>;
  completeTask(id: string, status: TaskStatus): Promise<void>;
}
