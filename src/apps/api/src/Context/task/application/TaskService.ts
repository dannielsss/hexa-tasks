import Task from '../domain/TaskModel';
import TaskRepository from '../domain/TaskRepository';

export default class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }

  async findById(taskId: string): Promise<Task> {
    return this.taskRepository.findById(taskId);
  }

  async createTask(name: string, deadline: string): Promise<void> {
    return this.taskRepository.createTask(name, deadline);
  }

  async editTask(id: string, name: string, deadline: string): Promise<void> {
    return this.taskRepository.editTask(id, name, deadline);
  }

  async deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }
}
