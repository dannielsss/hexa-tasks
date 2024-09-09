import TaskRepository from '../domain/TaskRepository';
import Task from '../domain/TaskModel';

import { database } from '../../../database/postgres';
import idGenerator from '../../../utils/id-generator';

export default class TaskPostgresRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    const result = await database.query('SELECT * FROM task');
    return result.rows;
  }

  async findById(taskId: string): Promise<Task> {
    const result = await database.query('SELECT * FROM task WHERE id = $1', [
      taskId,
    ]);

    return result.rows[0];
  }

  async createTask(name: string, deadline: string): Promise<void> {
    await database.query('INSERT INTO task(id, name, deadline, status) VALUES ($1, $2, $3, $4)', [
      idGenerator(),
      name,
      deadline,
      'Not started'
    ]);
  }

  async editTask(id: string, name: string, deadline: string): Promise<void> {
    await database.query('UPDATE task SET name = $1, deadline = $2 WHERE id = $3', [
      name,
      deadline,
      id
    ]);
  }

  async deleteTask(id: string): Promise<void> {
    await database.query('DELETE FROM task WHERE id = $1', [id]);
  }
}
