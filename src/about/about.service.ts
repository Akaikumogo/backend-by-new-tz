import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About, AboutDocument } from './schemas/about.schema';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {
  constructor(
    @InjectModel(About.name) private aboutModel: Model<AboutDocument>,
  ) {}

  async findOne(): Promise<AboutDocument> {
    const about = await this.aboutModel.findOne().exec();
    if (!about) {
      throw new NotFoundException('About info not found');
    }
    return about;
  }

  async update(updateAboutDto: UpdateAboutDto): Promise<AboutDocument> {
    const about = await this.aboutModel.findOneAndUpdate(
      {},
      updateAboutDto,
      { new: true, upsert: true },
    );
    return about;
  }
}

