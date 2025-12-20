import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Application,
  ApplicationDocument,
} from './schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationQueryDto } from './dto/application-query.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<ApplicationDocument> {
    const application = new this.applicationModel(createApplicationDto);
    return application.save();
  }

  async findAll(query: ApplicationQueryDto) {
    const { page = 1, limit = 10, status, date_from, date_to } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (date_from || date_to) {
      filter.createdAt = {};
      if (date_from) {
        filter.createdAt.$gte = new Date(date_from);
      }
      if (date_to) {
        filter.createdAt.$lte = new Date(date_to);
      }
    }

    const [data, total] = await Promise.all([
      this.applicationModel
        .find(filter)
        .populate('course_id', 'name')
        .populate('branch_id', 'name')
        .populate('assigned_to', 'full_name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.applicationModel.countDocuments(filter).exec(),
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

  async findOne(id: string): Promise<ApplicationDocument> {
    const application = await this.applicationModel
      .findById(id)
      .populate('course_id', 'name')
      .populate('branch_id', 'name')
      .populate('assigned_to', 'full_name email')
      .exec();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<ApplicationDocument> {
    const application = await this.applicationModel
      .findByIdAndUpdate(id, updateApplicationDto, { new: true })
      .populate('course_id', 'name')
      .populate('branch_id', 'name')
      .populate('assigned_to', 'full_name email')
      .exec();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return application;
  }

  async remove(id: string): Promise<void> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Application not found');
    }
  }
}

