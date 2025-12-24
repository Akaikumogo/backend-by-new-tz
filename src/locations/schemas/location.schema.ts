import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  phone?: string;

  @Prop()
  image?: string;

  @Prop({ type: { lat: Number, lng: Number }, required: false })
  coordinates?: { lat: number; lng: number };

  @Prop({ default: true })
  is_active: boolean;
}

export const LocationSchema = SchemaFactory.createForClass(Location);

