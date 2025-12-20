import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAboutDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  founder_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  founder_title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  founding_year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content_uz?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content_en?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content_ru?: string;
}

