import { z } from "zod";
import color from 'color-string';

function colorValidator(val: string) {
  try {
    return color.get(val) != null;
  } catch (error) {
    return false;
  }
}

export const LabelValidator = z.object({
  name: z.string().min(1),
  color: z.string().refine(colorValidator),
});

export const LabelAndTaskIdValidator = z.object({
  labelId: z.string().uuid(),
  taskId: z.string().uuid()
});

export default interface Label {
  id: string;
  name: string;
};
