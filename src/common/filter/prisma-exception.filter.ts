import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '../../../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Database error';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = 'Duplicate value.';
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Foreign key constraint failed.';
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
        break;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
    });
  }
}
