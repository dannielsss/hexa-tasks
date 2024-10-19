import Task, { TaskPriorities } from '../domain/TaskModel';
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

  async create(
    name: string,
    deadline: string,
    priority: TaskPriorities
  ): Promise<Task> {
    return this.taskRepository.create(name, deadline, priority);
  }

  async edit(id: string, name: string, deadline: string): Promise<void> {
    return this.taskRepository.edit(id, name, deadline);
  }

  async delete(id: string): Promise<void> {
    return this.taskRepository.delete(id);
  }
}
