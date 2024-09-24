import { Router } from "express";
import LabelController from "./LabelController";

const labelController = new LabelController();
const labelRoutes = Router();

labelRoutes.get('/', labelController.findAll);
labelRoutes.post('/', labelController.create);
labelRoutes.post('/assignLabelToTask', labelController.assignLabelToTask);

export default labelRoutes;
