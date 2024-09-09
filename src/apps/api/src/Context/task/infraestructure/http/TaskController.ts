import { Request, Response } from 'express';
import { ZodError } from 'zod';

import IWebResponse from '../../../../interfaces/web-response';
import TaskService from '../../application/TaskService';

import Task, { TaskValdiator } from '../../domain/TaskModel';

import TaskPostgresRepository from '../TaskPostgresRepository';
import HttpError from '../../../../errors/HttpError';

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
      if (error instanceof HttpError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, status: false, data: null });
      }

      console.error('An unexpected error ocurred: ', error);
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
      if (error instanceof HttpError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, status: false, data: null });
      }

      console.error('An unexpected error ocurred: ', error);
    }
  }

  async createTask(req: Request, res: Response<IWebResponse<null>>) {
    // NOTE: The deadline require this format: YYYY-MM-DD
    const { name, deadline }: BodyData = req.body;

    try {
      await TaskValdiator.parseAsync({ name, deadline });
      await taskService.createTask(name, deadline);

      res
        .status(200)
        .json({ message: 'Task created', status: true, data: null });
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, status: false, data: null });
      }

      if (error instanceof ZodError) {
        const errors: string[] = error.issues.map((issue) => issue.message + ' in (' + issue.path[0] + ') field.');
        return res.status(400).json({ message: errors, status: true, data: null });
      }

      console.error('An unexpected error ocurred: ', error)
    }
  }

  async deleteTask(req: Request, res: Response<IWebResponse<null>>) {
    try {
      const { taskId } = req.params;
      const task = await taskService.findById(taskId);
      if (!task) throw new HttpError(404, 'Task not found');

      await taskService.deleteTask(task.id);

      res.status(200).json({ message: 'Task deleted', status: true, data: null });
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, status: false, data: null });
      }

      console.error('An unexpected error ocurred: ', error);
    }
  }

  async editTask(req: Request, res: Response<IWebResponse<null>>) {
    const { taskId } = req.params;
    const { name, deadline }: BodyData = req.body;

    try {
      const task = await taskService.findById(taskId);
      if (!task) throw new HttpError(404, 'Task not found');

      await TaskValdiator.parseAsync({ name, deadline });
      await taskService.editTask(task.id, name, deadline);

      res.status(200).json({ message: 'Task edited', status: true, data: null });
    } catch (error) {
      if (error instanceof HttpError) {
        return res
          .status(error.statusCode)
          .json({ message: error.message, status: false, data: null });
      }

      if (error instanceof ZodError) {
        const errors: string[] = error.issues.map((issue) => issue.message + ' in (' + issue.path[0] + ') field.');
        return res.status(400).json({ message: errors, status: true, data: null });
      }

      console.error('An unexpected error ocurred: ', error);
    }
  }
}
