import TaskRepository from '../domain/TaskRepository';
import Task, { TaskPriorities, TaskStatus } from '../domain/TaskModel';

import { database } from '../../../database/postgres';
import idGenerator from '../../../utils/id-generator';

export default class TaskPostgresRepository implements TaskRepository {
  async findAll(): Promise<Task[]> {
    const result = await database.query(`
      SELECT T.*, STRING_AGG(L.name || '-' || L.color, ',') as labels FROM task T 
      	LEFT JOIN task_label TL ON T.id = TL.task_id
      	LEFT JOIN label L ON L.id = TL.label_id
      	GROUP BY T.id`);

    return result.rows;
  }

  async findById(taskId: string): Promise<Task> {
    const result = await database.query('SELECT * FROM task WHERE id = $1', [
      taskId,
    ]);

    return result.rows[0];
  }

  async create(
    name: string,
    deadline: string,
    priority: TaskPriorities
  ): Promise<void> {
    await database.query(
      'INSERT INTO task(id, name, deadline, priority, status) VALUES ($1, $2, $3, $4, $5)',
      [idGenerator(), name, deadline, priority, TaskStatus.NotStarted]
    );
  }

  async edit(id: string, name: string, deadline: string): Promise<void> {
    await database.query(
      'UPDATE task SET name = $1, deadline = $2 WHERE id = $3',
      [name, deadline, id]
    );
  }

  async delete(id: string): Promise<void> {
    await database.query('DELETE FROM task WHERE id = $1', [id]);
  }
}
