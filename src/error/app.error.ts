import { handleRedisError, RedisError } from "./redis.error.js";
import { BusinessError, handleBusinessError } from "./business.error.js";
import { handleZodError } from "./zod.error.js";
import { ZodError } from "zod";

export function handleAppError(error: unknown): {
  status: number;
  message: string;
} {
  if (error instanceof ZodError) {
    return handleZodError(error);
  } else if (error instanceof BusinessError) {
    return handleBusinessError(error);
  } else if (error instanceof RedisError) {
    return handleRedisError(error);
  } else {
    return { message: "Internal server error", status: 500 };
  }
}
