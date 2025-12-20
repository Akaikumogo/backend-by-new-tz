import {
  Injectable,
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import sharp from 'sharp';

@Injectable()
export class UploadService {
  private readonly uploadPath: string;
  private readonly maxImageSize = 5 * 1024 * 1024; // 5MB
  private readonly maxPdfSize = 10 * 1024 * 1024; // 10MB
  private readonly allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  private readonly allowedPdfTypes = ['application/pdf'];

  constructor(private configService: ConfigService) {
    this.uploadPath = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const isImage = this.allowedImageTypes.includes(file.mimetype);
    const isPdf = this.allowedPdfTypes.includes(file.mimetype);

    if (!isImage && !isPdf) {
      throw new UnsupportedMediaTypeException(
        'Only images (jpg, jpeg, png, webp) and PDF files are allowed',
      );
    }

    const maxSize = isImage ? this.maxImageSize : this.maxPdfSize;
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size exceeds maximum allowed size (${maxSize / 1024 / 1024}MB)`,
      );
    }

    const fileExtension = path.extname(file.originalname);
    const fileName = `${crypto.randomUUID()}${fileExtension}`;
    const filePath = path.join(this.uploadPath, fileName);

    // For images, optimize with sharp
    if (isImage) {
      await sharp(file.buffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toFile(filePath);
    } else {
      // For PDF, save as is
      fs.writeFileSync(filePath, file.buffer);
    }

    // Return URL (in production, this should be Cloudinary/AWS S3 URL)
    const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:5000');
    const url = `${baseUrl}/uploads/${fileName}`;

    return { url };
  }
}

