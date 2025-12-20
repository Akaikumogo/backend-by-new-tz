import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: false })
export class About {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  founder_name: string;

  @Prop({ required: true })
  founder_title: string;

  @Prop({ required: true })
  founding_year: number;

  @Prop({ required: true })
  content_uz: string;

  @Prop({ default: null })
  content_en: string;

  @Prop({ default: null })
  content_ru: string;
}

export const AboutSchema = SchemaFactory.createForClass(About);

