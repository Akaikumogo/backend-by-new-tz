import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './schemas/country.schema';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<CountryDocument> {
    const country = new this.countryModel(createCountryDto);
    return country.save();
  }

  async findAll() {
    return this.countryModel
      .find({ is_active: true })
      .sort({ order_index: 1, createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<CountryDocument> {
    const country = await this.countryModel.findById(id).exec();
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  async update(
    id: string,
    updateCountryDto: UpdateCountryDto,
  ): Promise<CountryDocument> {
    const country = await this.countryModel
      .findByIdAndUpdate(id, updateCountryDto, { new: true })
      .exec();
    if (!country) {
      throw new NotFoundException('Country not found');
    }
    return country;
  }

  async remove(id: string): Promise<void> {
    const result = await this.countryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Country not found');
    }
  }
}

