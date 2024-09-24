import { ZodError } from "zod";
import HttpError from "../errors/HttpError";
import IWebResponse from "../interfaces/web-response";
import { DatabaseError } from "pg";
import { Response } from "express";

export default function manageHttpError(error: unknown, res: Response<IWebResponse<any>>) {
  if (error instanceof HttpError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, status: false, data: null });
  }

  if (error instanceof ZodError) {
    const errors: string[] = error.issues.map((issue) => issue.message + ' in (' + issue.path[0] + ') field.');
    return res.status(400).json({ message: errors, status: false, data: null });
  }

  if (error instanceof DatabaseError) {
    return res.status(400).json({ message: error.message, status: false, data: null });
  }

  console.error('An unexpected error ocurred: ', error)
}
