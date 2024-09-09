import Task from './TaskModel';

export default interface TaskRepository {
  findAll(): Promise<Task[]>;
  findById(taskId: string): Promise<Task>;
  createTask(name: string, deadline: string): Promise<void>;
  deleteTask(id: string): Promise<void>;
  editTask(id: string, name: string, deadline: string): Promise<void>;
}
