import { IsString, IsNotEmpty, IsOptional, IsInt, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role_title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  birth_year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  birth_place?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar_url: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  order_index?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_featured?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  social_links?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    linkedin?: string;
  };
}

