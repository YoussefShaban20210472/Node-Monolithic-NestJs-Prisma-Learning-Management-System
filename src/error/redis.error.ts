export class RedisError extends Error {
  constructor(message: string) {
    super(message);
  }
}
export function handleRedisError(error: RedisError): {
  status: number;
  message: string;
} {
  return { message: error.message, status: 500 };
}
