import { database } from '../../../database/postgres';
import idGenerator from '../../../utils/id-generator';
import Label from '../domain/LabelModel';
import LabelRepository from '../domain/LabelRepository';

export default class LabelPostgresRepository implements LabelRepository {
  async findAll(): Promise<Label[]> {
    const result = await database.query('SELECT * FROM label');
    return result.rows;
  }

  async create(name: string, color: string): Promise<void> {
    await database.query(
      'INSERT INTO label(id, name, color) VALUES ($1, $2, $3)',
      [idGenerator(), name, color]
    );
  }

  async assignLabelToTask(labelId: string, taskId: string): Promise<void> {
    await database.query(
      'INSERT INTO task_label(id, label_id, task_id) VALUES ($1, $2, $3)',
      [idGenerator(), labelId, taskId]
    );
  }

  async deleteRelationTaskLabel(
    taskId: string | null,
    labelId: string | null
  ): Promise<void> {
    taskId
      ? await database.query('DELETE FROM task_label WHERE task_id = $1', [
          taskId,
        ])
      : await database.query('DELETE FROM task_label WHERE label_id = $1', [
          labelId,
        ]);
  }
}
