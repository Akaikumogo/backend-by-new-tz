import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  birth: string;

  @Prop({ required: true })
  description1: string;

  @Prop({ required: true })
  image: string; // Image URL

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  is_active: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

