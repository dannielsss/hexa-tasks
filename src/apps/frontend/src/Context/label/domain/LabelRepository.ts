import Label from "./Label";

export default interface LabelRepository {
  findAll(): Promise<Label[]>;
}
