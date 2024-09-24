import { Request, Response } from "express";
import LabelService from "../../application/LabelService";
import LabelPostgresRepository from "../LabelPostgresRepository";
import IWebResponse from "../../../../interfaces/web-response";
import Label, { LabelValidator } from "../../domain/LabelModel";
import manageHttpError from "../../../../utils/manage-http-error";

const labelRepository = new LabelPostgresRepository();
const labelService = new LabelService(labelRepository);

interface BodyData {
  name: string;
  color: string;
}

export default class LabelController {
  async findAll(_req: Request, res: Response<IWebResponse<Label[] | null>>) {
    try {
      const labels = await labelService.findAll();
      res.status(200).json({ message: 'Find labels', status: true, data: labels });
    } catch (error) {
      manageHttpError(error, res);
    }
  }

  async create(req: Request, res: Response<IWebResponse<null>>) {
    const { name, color }: BodyData = req.body;

    try {
      await LabelValidator.parseAsync({ name, color });
      await labelService.create(name, color);

      res.status(200).json({ message: 'Create label', status: true, data: null });
    } catch (error) {
      manageHttpError(error, res);
    }
  }
}
