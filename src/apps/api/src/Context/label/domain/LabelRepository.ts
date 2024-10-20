import Label from './LabelModel';

export default interface LabelRepository {
  findAll(): Promise<Label[]>;
  create(name: string, color: string): Promise<void>;
  assignLabelToTask(labelId: string, taskId: string): Promise<void>;
  deleteRelationTaskLabel(
    taskId: string | null,
    labelId: string | null
  ): Promise<void>;
}
