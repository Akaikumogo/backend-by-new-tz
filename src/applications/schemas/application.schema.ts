import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApplicationStatus } from '../../common/enums/application-status.enum';

export type ApplicationDocument = Application & Document;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: null })
  email: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Course', default: null })
  course_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Branch', default: null })
  branch_id: string;

  @Prop({ default: null })
  message: string;

  @Prop({ type: String, enum: ApplicationStatus, default: ApplicationStatus.NEW })
  status: ApplicationStatus;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', default: null })
  assigned_to: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

