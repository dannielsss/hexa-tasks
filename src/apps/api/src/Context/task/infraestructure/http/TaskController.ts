import { Request, Response } from 'express';

import IWebResponse from '../../../../interfaces/web-response';
import TaskService from '../../application/TaskService';

import Task, { TaskValdiator } from '../../domain/TaskModel';

import TaskPostgresRepository from '../TaskPostgresRepository';
import HttpError from '../../../../errors/HttpError';
import manageHttpError from '../../../../utils/manage-http-error';

const taskRepository = new TaskPostgresRepository();
const taskService = new TaskService(taskRepository);

interface BodyData {
  name: string;
  deadline: string;
}

export default class TaskController {
  async findAll(_: Request, res: Response<IWebResponse<Task[] | null>>) {
    try {
      const tasks = await taskService.findAll();
      res
        .status(200)
        .json({ message: 'Find all tasks', status: true, data: tasks });
    } catch (error) {
      manageHttpError(error, res);
    }
  }

  async findById(req: Request, res: Response<IWebResponse<Task | null>>) {
    try {
      const { taskId } = req.params;
      const task = await taskService.findById(taskId);
      if (!task) throw new HttpError(404, 'Task not found');

      res
        .status(200)
        .json({ message: 'Find one task', status: true, data: task });
    } catch (error) {
      manageHttpError(error, res);
    }
  }

  async create(req: Request, res: Response<IWebResponse<null>>) {
    // NOTE: The deadline require this format: YYYY-MM-DD
    const { name, deadline }: BodyData = req.body;

    try {
      await TaskValdiator.parseAsync({ name, deadline });
      await taskService.create(name, deadline);

      res
        .status(200)
        .json({ message: 'Task created', status: true, data: null });
    } catch (error) {
      manageHttpError(error, res);
    }
  }

  async delete(req: Request, res: Response<IWebResponse<null>>) {
    try {
      const { taskId } = req.params;
      const task = await taskService.findById(taskId);
      if (!task) throw new HttpError(404, 'Task not found');

      await taskService.delete(task.id);

      res.status(200).json({ message: 'Task deleted', status: true, data: null });
    } catch (error) {
      manageHttpError(error, res);
    }
  }

  async edit(req: Request, res: Response<IWebResponse<null>>) {
    const { taskId } = req.params;
    const { name, deadline }: BodyData = req.body;

    try {
      const task = await taskService.findById(taskId);
      if (!task) throw new HttpError(404, 'Task not found');

      await TaskValdiator.parseAsync({ name, deadline });
      await taskService.edit(task.id, name, deadline);

      res.status(200).json({ message: 'Task edited', status: true, data: null });
    } catch (error) {
      manageHttpError(error, res);
    }
  }
}
