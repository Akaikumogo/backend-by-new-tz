import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BranchDocument = Branch & Document;

@Schema({ timestamps: true })
export class Branch {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  destination_landmark: string;

  @Prop({ required: true })
  work_time: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: null })
  email: string;

  @Prop({ required: true })
  image_url: string;

  @Prop({ required: true })
  map_url: string;

  @Prop({ default: null })
  latitude: number;

  @Prop({ default: null })
  longitude: number;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: 0 })
  order_index: number;
}

export const BranchSchema = SchemaFactory.createForClass(Branch);

