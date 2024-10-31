import express from 'express';
import TaskController from './TaskController';

const taskController = new TaskController();
const taskRoutes = express.Router();

taskRoutes.get('/', taskController.findAll);
taskRoutes.get('/:taskId', taskController.findById);
taskRoutes.post('/', taskController.create);
taskRoutes.delete('/:taskId', taskController.delete);
taskRoutes.put('/:taskId', taskController.edit);
taskRoutes.put('/:taskId/complete', taskController.completeTask);

export default taskRoutes;
