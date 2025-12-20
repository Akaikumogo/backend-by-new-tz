import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Email (for admin) or Phone number (for other users)',
    example: 'admin@gmail.com or +998901234567',
  })
  @IsString()
  @IsNotEmpty()
  login: string; // Can be email or phone

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

