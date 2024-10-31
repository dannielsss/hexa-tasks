import TaskRepository from '../domain/TaskRepository';
import Task, { TaskPriorities, TaskStatus } from '../domain/TaskModel';

import { database } from '../../../database/postgres';
import idGenerator from '../../../utils/id-generator';
import LabelService from '../../label/application/LabelService';
import LabelPostgresRepository from '../../label/infraestructure/LabelPostgresRepository';

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
  ): Promise<Task> {
    const result = await database.query(
      'INSERT INTO task(id, name, deadline, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [idGenerator(), name, deadline, priority, TaskStatus.NotStarted]
    );

    return result.rows[0];
  }

  async edit(id: string, name: string, deadline: string): Promise<void> {
    await database.query(
      'UPDATE task SET name = $1, deadline = $2 WHERE id = $3',
      [name, deadline, id]
    );
  }

  async completeTask(id: string, status: TaskStatus): Promise<void> {
    await database.query('UPDATE task SET status = $1 WHERE id = $2', [
      status,
      id,
    ]);
  }

  async delete(id: string): Promise<void> {
    const labelRepository = new LabelPostgresRepository();
    const labelService = new LabelService(labelRepository);

    await labelService.deleteRelationTaskLabel(id, null);
    await database.query('DELETE FROM task WHERE id = $1', [id]);
  }
}
