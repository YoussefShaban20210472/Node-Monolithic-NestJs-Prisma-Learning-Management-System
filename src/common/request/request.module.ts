import { Module } from '@nestjs/common';
import { RequestService } from './request.service.js';

@Module({
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
