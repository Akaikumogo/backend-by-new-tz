import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string; // "2 soat", "6 oy"

  @Prop({ type: Number, required: false })
  daysPerWeek?: number; // Haftada necha kun dars

  @Prop({ type: Number, required: false })
  hoursPerDay?: number; // Bir kunda necha soat dars

  @Prop()
  icon?: string; // Lucide icon nomi (masalan, "GraduationCap")

  @Prop()
  image?: string; // icon yoki image URL

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Teacher' }], default: [] })
  teachers: Types.ObjectId[];

  @Prop({ default: true })
  is_active: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

