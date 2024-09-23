import LabelModel from "./LabelModel";

export default interface LabelRepository {
  findAll(): Promise<LabelModel[]>;
  create(name: string): Promise<void>;
}
