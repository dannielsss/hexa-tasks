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

  async create(name: string): Promise<void> {
    await this.labelRepository.create(name);
  }
}

