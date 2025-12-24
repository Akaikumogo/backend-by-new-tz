import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'United Kingdom' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://flagcdn.com/gb.svg' })
  @IsString()
  @IsNotEmpty()
  flag: string;

  @ApiProperty({ example: 'UK universitetlari...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '6.5' })
  @IsString()
  @IsNotEmpty()
  minIELTS: string;

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

