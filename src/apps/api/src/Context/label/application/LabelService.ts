import LabelRepository from "../domain/LabelRepository";
import LabelModel from "../domain/LabelModel";

export default class LabelService {
  private labelRepository: LabelRepository;

  constructor(labelRepository: LabelRepository) {
    this.labelRepository = labelRepository;
  }

  async findAll(): Promise<LabelModel[]> {
    return await this.labelRepository.findAll()
  }

  async create(name: string, color: string): Promise<void> {
    await this.labelRepository.create(name, color);
  }

  async assignLabelToTask(labelId: string, taskId: string): Promise<void> {
    await this.labelRepository.assignLabelToTask(labelId, taskId);
  }
}

