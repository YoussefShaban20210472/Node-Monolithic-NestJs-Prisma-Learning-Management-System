import { BusinessError } from "../error/business.error";

declare global {
  namespace Express {
    interface Request {
      dir?: string;
      filename?: string;
      fileError?: BusinessError;
    }
  }
}

export {};
