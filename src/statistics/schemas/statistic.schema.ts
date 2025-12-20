import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatisticDocument = Statistic & Document;

@Schema({ timestamps: false })
export class Statistic {
  @Prop({ required: true })
  metric_name: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  label: string;

  @Prop({ default: null })
  icon_code: string;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
StatisticSchema.index({ metric_name: 1 }, { unique: true });

