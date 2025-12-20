import { IsString, IsNotEmpty, IsOptional, IsEmail, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  course_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  branch_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  message?: string;
}

