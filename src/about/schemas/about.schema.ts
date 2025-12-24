import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true })
export class About {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string; // Rich text yoki markdown

  @Prop({ type: [String], default: [] })
  images?: string[];

  @Prop({ default: true })
  is_active: boolean;
}

export const AboutSchema = SchemaFactory.createForClass(About);

