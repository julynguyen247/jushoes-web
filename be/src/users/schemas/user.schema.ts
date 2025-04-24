import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  fullName: string;
  @Prop()
  phone: string;
  @Prop()
  address: string;
  @Prop()
  role: string;
  @Prop()
  refreshToken: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deleted?: boolean;
  @Prop()
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
