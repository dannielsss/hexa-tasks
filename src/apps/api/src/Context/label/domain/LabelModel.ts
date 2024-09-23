import { z } from "zod";

export default interface LabelModel {
  id: string;
  name: string;
}

export const LabelValidator = z.object({
  name: z.string(),
})
