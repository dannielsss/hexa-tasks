import express from 'express';
import TaskController from './TaskController';

const taskController = new TaskController();
const taskRoutes = express.Router();

taskRoutes.get('/', taskController.findAll);
taskRoutes.get('/:taskId', taskController.findById);
taskRoutes.post('/', taskController.createTask);
taskRoutes.delete('/:taskId', taskController.deleteTask);
taskRoutes.put('/:taskId', taskController.editTask);

export default taskRoutes;
