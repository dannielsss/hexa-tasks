import { database } from "../../../database/postgres";
import idGenerator from "../../../utils/id-generator";
import LabelModel from "../domain/LabelModel";
import LabelRepository from "../domain/LabelRepository";

export default class LabelPostgresRepository implements LabelRepository {
  async findAll(): Promise<LabelModel[]> {
    const result = await database.query('SELECT * FROM label');
    return result.rows;
  }

  async create(name: string): Promise<void> {
    await database.query('INSERT INTO label(id, name) VALUES ($1, $2)', [
      idGenerator(),
      name
    ]);
  }
}
