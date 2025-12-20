import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schemas/statistic.schema';
import { UpdateStatisticDto } from './dto/update-statistic.dto';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Statistic.name)
    private statisticModel: Model<StatisticDocument>,
  ) {}

  async findAll(): Promise<StatisticDocument[]> {
    return this.statisticModel.find().exec();
  }

  async findOne(id: string): Promise<StatisticDocument> {
    const statistic = await this.statisticModel.findById(id).exec();
    if (!statistic) {
      throw new NotFoundException('Statistic not found');
    }
    return statistic;
  }

  async update(
    id: string,
    updateStatisticDto: UpdateStatisticDto,
  ): Promise<StatisticDocument> {
    const statistic = await this.statisticModel
      .findByIdAndUpdate(id, updateStatisticDto, { new: true })
      .exec();
    if (!statistic) {
      throw new NotFoundException('Statistic not found');
    }
    return statistic;
  }
}

