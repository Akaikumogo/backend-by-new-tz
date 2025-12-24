import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'IT Specialist' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: 'Born in 1990' })
  @IsString()
  @IsNotEmpty()
  birth: string;

  @ApiProperty({ example: 'Description text...' })
  @IsString()
  @IsNotEmpty()
  description1: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ example: 'john-doe' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

