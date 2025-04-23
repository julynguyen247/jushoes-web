import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
export type OrderDocument = HydratedDocument<Order>;
@Schema({ timestamps: true })
export class Order {
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  phone: string;
  @Prop()
  totalPrice: number;
  @Prop()
  type: string;
  @Prop({ type: Object })
  detail: {
    _id: mongoose.Schema.Types.ObjectId;
    quantity: string;
    shoesName: string;
  };
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deleted?: boolean;
  @Prop()
  deletedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
