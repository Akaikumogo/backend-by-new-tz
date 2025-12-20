import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, phone, password, full_name } = registerDto;

    // Check if user exists
    const existingUser = await this.usersService.findByEmailOrPhone(email, phone);
    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.usersService.create({
      email,
      phone,
      password: hashedPassword,
      full_name,
      role: Role.USER,
    });

    // Generate tokens
    const token = this.generateToken(user._id.toString());
    const refreshToken = this.generateRefreshToken(user._id.toString());

    // Save refresh token
    await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);

    return {
      user: this.usersService.sanitizeUser(user),
      token,
      refresh_token: refreshToken,
    };
  }

  async login(loginDto: LoginDto) {
    const { login, password } = loginDto;

    // Determine if login is email or phone
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const isPhone = /^\+998\d{9}$/.test(login);

    let user;
    if (isEmail) {
      // For admin: login with email
      user = await this.usersService.findByEmail(login);
    } else if (isPhone) {
      // For other users: login with phone
      user = await this.usersService.findByPhone(login);
    } else {
      throw new UnauthorizedException('Invalid login format. Use email or phone (+998XXXXXXXXX)');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.usersService.updateLastLogin(user._id.toString());

    // Generate tokens
    const token = this.generateToken(user._id.toString());
    const refreshToken = this.generateRefreshToken(user._id.toString());

    // Save refresh token
    await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);

    return {
      user: this.usersService.sanitizeUser(user),
      token,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.is_active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if refresh token matches
      if (user.refresh_token !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const newToken = this.generateToken(user._id.toString());
      const newRefreshToken = this.generateRefreshToken(user._id.toString());

      // Update refresh token
      await this.usersService.updateRefreshToken(user._id.toString(), newRefreshToken);

      return {
        token: newToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.is_active) {
      throw new UnauthorizedException();
    }
    return this.usersService.sanitizeUser(user);
  }

  async logout(userId: string): Promise<void> {
    // Clear refresh token
    await this.usersService.updateRefreshToken(userId, null);
  }

  private generateToken(userId: string): string {
    const payload = { sub: userId };
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '24h');
    return this.jwtService.sign(payload, {
      expiresIn: expiresIn,
    } as any);
  }

  private generateRefreshToken(userId: string): string {
    const payload = { sub: userId };
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: expiresIn,
    } as any);
  }
}

