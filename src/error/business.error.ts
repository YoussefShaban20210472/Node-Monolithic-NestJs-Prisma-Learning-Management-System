export class BusinessError extends Error {
  private status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
}
export class ObjectNotFound extends BusinessError {
  constructor(objectName: string) {
    super(`${objectName} Not Found`, 404);
  }
}
export class BadRequest extends BusinessError {
  constructor(message: string) {
    super(message, 400);
  }
}
export class Unauthorized extends BusinessError {
  constructor() {
    super("You are not allowed to commit this action", 403);
  }
}
export class Unauthenticated extends BusinessError {
  constructor() {
    super("api-key require", 401);
  }
}
export class Confilct extends BusinessError {
  constructor(message: string) {
    super(message, 409);
  }
}
export function handleBusinessError(error: BusinessError): {
  status: number;
  message: string;
} {
  return { message: error.message, status: error.getStatus() };
}
