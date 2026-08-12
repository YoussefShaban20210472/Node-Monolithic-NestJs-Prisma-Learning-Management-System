import { NextFunction, Request, Response } from "express";
import { handleAppError } from "../error/app.error";

export function errorAppHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = handleAppError(error);
  res.status(result.status).json({ errors: result.message });
}
