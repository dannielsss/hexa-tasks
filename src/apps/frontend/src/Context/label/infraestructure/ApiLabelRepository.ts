import Label from "../domain/Label";
import LabelRepository from "../domain/LabelRepository";

export default class ApiLabelRepository implements LabelRepository {
  async findAll(): Promise<Label[]> {
    return [];
  }
}
