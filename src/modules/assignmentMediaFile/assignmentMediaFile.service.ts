/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssignmentMediaFileRepository } from './assignmentMediaFile.repository.js';
import path from 'path';
import { RequestService } from '../../common/request/request.service.js';
import { MediaFileDto } from '../../common/dto/mediaFile.dto.js';

@Injectable()
export class AssignmentMediaFileService {
  constructor(
    private readonly assignmentMediaFileRepository: AssignmentMediaFileRepository,
    private readonly requestService: RequestService,
  ) {}

  async createSignedUrl(
    assignmentId: number,
    dto: MediaFileDto,
    type: 'upload' | 'download' | 'delete',
  ) {
    const DIR = path.join(`assignments`, String(assignmentId), 'mediaFiles');
    const filePath = path.join(DIR, dto.file);
    if (type !== 'upload') await this.assertMediaFileExists(filePath);
    else await this.assertMediaFileNotExists(filePath);
    const signedUrl = await this.requestService.sendSignedUrlRequest(
      dto.file,
      DIR,
      type,
    );
    return { signedUrl };
  }

  async confirmSignedUrl(
    assignmentId: number,
    dto: MediaFileDto,
    type: 'upload' | 'delete',
  ) {
    const DIR = path.join(`assignments`, String(assignmentId), 'mediaFiles');
    const filePath = path.join(DIR, dto.file);
    if (type !== 'upload') await this.assertMediaFileExists(filePath);
    else await this.assertMediaFileNotExists(filePath);

    const isFileExsitedOnServer =
      await this.requestService.sendCheckFileExistsRequest(dto.file, DIR);

    if (type === 'delete') {
      if (isFileExsitedOnServer) {
        throw new ConflictException('Assignment Media File is arleady existed');
      }
      return await this.deleteMediaFile(filePath);
    } else {
      if (!isFileExsitedOnServer) {
        throw new NotFoundException('Assignment Media File not found');
      }
      return await this.createMediaFile(assignmentId, dto.file, filePath);
    }
  }
  async createMediaFile(assignmentId: number, file: string, filePath: string) {
    return await this.assignmentMediaFileRepository.create(
      assignmentId,
      file,
      filePath,
    );
  }
  async deleteMediaFile(filePath: string) {
    const result =
      await this.assignmentMediaFileRepository.deleteByPath(filePath);
    if (result === null) {
      throw new NotFoundException('Assignment Media File not found');
    }
    return result;
  }
  async findByPath(path: string) {
    const assignmentMediaFile =
      await this.assignmentMediaFileRepository.findByPath(path);

    if (!assignmentMediaFile) {
      throw new NotFoundException('Assignment Media File not found');
    }

    return assignmentMediaFile;
  }
  async assertMediaFileExists(path: string) {
    await this.findByPath(path);
  }
  async assertMediaFileNotExists(path: string) {
    try {
      await this.findByPath(path);
      throw new ConflictException('Assignment Media File is already existed');
    } catch {
      return;
    }
  }
  findAll(assignmentId: number, page = 1, limit = 10) {
    return this.assignmentMediaFileRepository.findAll(
      assignmentId,
      (page - 1) * limit,
      limit,
    );
  }
}
