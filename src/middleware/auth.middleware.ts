import { NextFunction, Request, Response } from "express";
import config from "../config/index.js";
import { Unauthenticated } from "../error/business.error.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const api_key = req.headers["api-key"];
  if (api_key === config.api_key) {
    next();
  } else {
    throw new Unauthenticated();
  }
};
