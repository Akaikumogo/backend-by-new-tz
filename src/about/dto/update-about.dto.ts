import { IsString, IsNotEmpty, IsOptional, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAboutDto {
  @ApiProperty({ example: 'About Us' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Content text...' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

