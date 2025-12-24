import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Frontend dasturlash' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Frontend dasturlash kursi...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2 soat' })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ required: false, example: 3, description: 'Haftada necha kun dars' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(7)
  daysPerWeek?: number;

  @ApiProperty({ required: false, example: 2, description: 'Bir kunda necha soat dars' })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(12)
  hoursPerDay?: number;

  @ApiProperty({ required: false, example: 'GraduationCap', description: 'Lucide icon nomi' })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  teacherIds?: string[];

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

