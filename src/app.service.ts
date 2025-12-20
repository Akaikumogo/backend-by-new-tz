import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      success: true,
      message: 'Young Adults Study Center API',
      version: '1.0.0',
    };
  }
}

