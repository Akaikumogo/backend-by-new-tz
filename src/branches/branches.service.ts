import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Branch, BranchDocument } from './schemas/branch.schema';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name) private branchModel: Model<BranchDocument>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<BranchDocument> {
    const branch = new this.branchModel(createBranchDto);
    return branch.save();
  }

  async findAll(is_active?: boolean) {
    const filter: any = {};
    if (is_active !== undefined) {
      filter.is_active = is_active;
    }
    return this.branchModel
      .find(filter)
      .sort({ order_index: 1, createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<BranchDocument> {
    const branch = await this.branchModel.findById(id).exec();
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  async update(
    id: string,
    updateBranchDto: UpdateBranchDto,
  ): Promise<BranchDocument> {
    const branch = await this.branchModel
      .findByIdAndUpdate(id, updateBranchDto, { new: true })
      .exec();
    if (!branch) {
      throw new NotFoundException('Branch not found');
    }
    return branch;
  }

  async remove(id: string): Promise<void> {
    const result = await this.branchModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Branch not found');
    }
  }
}

