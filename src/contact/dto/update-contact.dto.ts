import { IsString, IsNotEmpty, IsOptional, IsEmail, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContactDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_primary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_secondary?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  social_links?: {
    instagram?: string;
    telegram?: string;
    facebook?: string;
    youtube?: string;
  };
}

