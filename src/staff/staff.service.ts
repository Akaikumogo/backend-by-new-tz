import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Staff, StaffDocument } from './schemas/staff.schema';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffQueryDto } from './dto/staff-query.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff.name) private staffModel: Model<StaffDocument>,
  ) {}

  async create(createStaffDto: CreateStaffDto): Promise<StaffDocument> {
    const staff = new this.staffModel(createStaffDto);
    return staff.save();
  }

  async findAll(query: StaffQueryDto) {
    const { page = 1, limit = 10, role, is_featured } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (role) {
      filter.role_title = { $regex: role, $options: 'i' };
    }
    if (is_featured !== undefined) {
      filter.is_featured = is_featured;
    }

    const [data, total] = await Promise.all([
      this.staffModel
        .find(filter)
        .sort({ order_index: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.staffModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findBySlug(slug: string): Promise<StaffDocument> {
    const staff = await this.staffModel.findOne({ slug }).exec();
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async findOne(id: string): Promise<StaffDocument> {
    const staff = await this.staffModel.findById(id).exec();
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<StaffDocument> {
    const staff = await this.staffModel
      .findByIdAndUpdate(id, updateStaffDto, { new: true })
      .exec();
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    return staff;
  }

  async remove(id: string): Promise<void> {
    // Soft delete - set is_active to false if needed, or actually delete
    const result = await this.staffModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Staff not found');
    }
  }
}

