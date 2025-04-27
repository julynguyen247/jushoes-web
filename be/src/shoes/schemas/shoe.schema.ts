import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongooseDelete from 'mongoose-delete';
export type ShoesDocument = HydratedDocument<Shoes>;
@Schema({ timestamps: true })
export class Shoes {
  @Prop()
  mainText: string;
  @Prop()
  brand: string;
  @Prop()
  price: string;
  @Prop()
  thumbnail: string;
  @Prop()
  slider: string[];
  @Prop()
  quantity: string;

  @Prop()
  category: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  deleted?: boolean;
  @Prop()
  deletedAt?: Date;
}

export const ShoesSchema = SchemaFactory.createForClass(Shoes);

ShoesSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
