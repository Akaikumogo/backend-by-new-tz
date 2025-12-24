import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  name: string; // Country name

  @Prop({ required: true })
  flag: string; // Flag image URL

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  minIELTS: string;

  @Prop({ default: 0 })
  order: number; // Display order

  @Prop({ default: true })
  is_active: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

