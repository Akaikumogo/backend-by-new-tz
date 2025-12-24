import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsObject, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: 'Main Branch' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '123 Main St, Tashkent' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: { lat: 41.3111, lng: 69.2797 }, required: false })
  @IsObject()
  @IsOptional()
  coordinates?: { lat: number; lng: number };

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

