/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CourseMediaFileRepository } from './courseMediaFile.repository.js';
import { CourseMediaFileDto } from './dto/create-courseMediaFile.dto.js';
import path from 'path';
import { RequestService } from '../../common/request/request.service.js';

@Injectable()
export class CourseMediaFileService {
  constructor(
    private readonly courseRepository: CourseMediaFileRepository,
    private readonly requestService: RequestService,
  ) {}

  async createSignedUrl(
    courseId: number,
    dto: CourseMediaFileDto,
    type: 'upload' | 'download' | 'delete',
  ) {
    const DIR = path.join(`courses`, String(courseId), 'mediaFiles');
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
    courseId: number,
    dto: CourseMediaFileDto,
    type: 'upload' | 'delete',
  ) {
    const DIR = path.join(`courses`, String(courseId), 'mediaFiles');
    const filePath = path.join(DIR, dto.file);
    if (type !== 'upload') await this.assertMediaFileExists(filePath);
    else await this.assertMediaFileNotExists(filePath);

    const isFileExsitedOnServer =
      await this.requestService.sendCheckFileExistsRequest(dto.file, DIR);

    if (type === 'delete') {
      if (isFileExsitedOnServer) {
        throw new ConflictException('Course Media File is arleady existed');
      }
      return await this.deleteMediaFile(filePath);
    } else {
      if (!isFileExsitedOnServer) {
        throw new NotFoundException('Course Media File not found');
      }
      return await this.createMediaFile(courseId, dto.file, filePath);
    }
  }
  async createMediaFile(courseId: number, file: string, filePath: string) {
    return await this.courseRepository.create(courseId, file, filePath);
  }
  async deleteMediaFile(filePath: string) {
    const result = await this.courseRepository.deleteByPath(filePath);
    if (result === null) {
      throw new NotFoundException('Course Media File not found');
    }
    return result;
  }
  async findByPath(path: string) {
    const courseMediaFile = await this.courseRepository.findByPath(path);

    if (!courseMediaFile) {
      throw new NotFoundException('Course Media File not found');
    }

    return courseMediaFile;
  }
  async assertMediaFileExists(path: string) {
    await this.findByPath(path);
  }
  async assertMediaFileNotExists(path: string) {
    try {
      await this.findByPath(path);
      throw new ConflictException('Course Media File is already existed');
    } catch {
      return;
    }
  }
  findAll(courseId: number, page = 1, limit = 10) {
    return this.courseRepository.findAll(courseId, (page - 1) * limit, limit);
  }
}
