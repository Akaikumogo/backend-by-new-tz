import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {}

  async findOne(): Promise<ContactDocument> {
    const contact = await this.contactModel.findOne().exec();
    if (!contact) {
      throw new NotFoundException('Contact info not found');
    }
    return contact;
  }

  async update(updateContactDto: UpdateContactDto): Promise<ContactDocument> {
    const contact = await this.contactModel.findOneAndUpdate(
      {},
      updateContactDto,
      { new: true, upsert: true },
    );
    return contact;
  }
}

