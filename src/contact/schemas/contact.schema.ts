import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: false })
export class Contact {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone_primary: string;

  @Prop({ default: null })
  phone_secondary: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: Object, default: null })
  social_links: {
    instagram?: string;
    telegram?: string;
    facebook?: string;
    youtube?: string;
  };
}

export const ContactSchema = SchemaFactory.createForClass(Contact);

