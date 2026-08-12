import { NextFunction, Request, Response } from "express";
import { assertFile } from "../service/file.service.js";
import { handleAppError } from "../error/app.error.js";
import { BusinessError } from "../error/business.error.js";

export function fileMiddleware(type: "upload" | "download" | "delete") {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.query.token;
      const result = await assertFile(token, type);
      req.dir = result.fileDir;
      req.filename = result.filename;
    } catch (error) {
      if (type !== "upload") {
        throw error;
      }
      const result = handleAppError(error);
      req.fileError = new BusinessError(result.message, result.status);
    }
    next();
  };
}
