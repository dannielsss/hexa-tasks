import Label from "../domain/Label";
import LabelRepository from "../domain/LabelRepository";

export default class LabelService {
  private labelRepository: LabelRepository;

  constructor(labelRepository: LabelRepository) {
    this.labelRepository = labelRepository;
  }

  async findAll(): Promise<Label[]> {
    return await this.labelRepository.findAll();
  }
}
