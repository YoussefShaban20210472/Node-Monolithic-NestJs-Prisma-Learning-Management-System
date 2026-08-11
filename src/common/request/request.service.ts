/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Injectable } from '@nestjs/common';
import config from '../../config/index.js';

@Injectable()
export class RequestService {
  constructor() {}
  async sendSignedUrlRequest(
    file: string,
    directory: string,
    type: 'upload' | 'download' | 'delete',
  ) {
    const url = config[`${type}_api`];
    const body = { file, directory };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': config.storage_api_key!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();
    if (!response.ok) {
      console.log('error');
      throw new BadRequestException(JSON.stringify(responseBody));
    }
    return responseBody.signedUrl;
  }
  async sendCheckFileExistsRequest(file: string, directory: string) {
    const url = config.check_file_exists_api;
    const body = { file, directory };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'api-key': config.storage_api_key!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json();
    if (!response.ok) {
      console.log('error');
      throw new BadRequestException(JSON.stringify(responseBody));
    }
    return responseBody.isFileExsited;
  }
}
