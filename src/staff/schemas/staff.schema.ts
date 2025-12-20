import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StaffDocument = Staff & Document;

@Schema({ timestamps: true })
export class Staff {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  user_id: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  role_title: string;

  @Prop({ default: null })
  birth_year: number;

  @Prop({ default: null })
  birth_place: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: null })
  bio: string;

  @Prop({ required: true })
  avatar_url: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0 })
  order_index: number;

  @Prop({ default: false })
  is_featured: boolean;

  @Prop({ type: Object, default: null })
  social_links: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    linkedin?: string;
  };
}

export const StaffSchema = SchemaFactory.createForClass(Staff);

