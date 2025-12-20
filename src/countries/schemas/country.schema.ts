import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ timestamps: true })
export class Country {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  flag_url: string;

  @Prop({ required: true })
  min_ielts: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  order_index: number;

  @Prop({ default: true })
  is_active: boolean;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

