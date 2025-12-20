import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { Role } from '../enums/role.enum';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = 'admin@gmail.com';
    const adminPhone = '+998901234567';
    const adminPassword = '@dm1n';

    // Check if admin already exists
    const existingAdmin = await this.userModel.findOne({
      $or: [{ email: adminEmail }, { phone: adminPhone }],
    });

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = new this.userModel({
      full_name: 'Super Admin',
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: Role.SUPER_ADMIN,
      is_active: true,
    });

    await admin.save();
    console.log('✅ Default admin created:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
  }
}

