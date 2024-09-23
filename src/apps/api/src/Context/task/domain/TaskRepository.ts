import Task from './TaskModel';

export default interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(taskId: string): Promise<Task>;
  create(name: string, deadline: string): Promise<void>;
  delete(id: string): Promise<void>;
  edit(id: string, name: string, deadline: string): Promise<void>;
}
