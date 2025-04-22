import { Module } from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { ShoesController } from './shoes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shoes, ShoesSchema } from './schemas/shoe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shoes.name, schema: ShoesSchema }]),
  ],
  controllers: [ShoesController],
  providers: [ShoesService],
})
export class ShoesModule {}
