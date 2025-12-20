import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CourseCategory } from '../../common/enums/course-category.enum';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, enum: CourseCategory, required: true })
  category: CourseCategory;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ default: null })
  icon_code: string;

  @Prop({ default: null })
  price: number;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: 0 })
  order_index: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

