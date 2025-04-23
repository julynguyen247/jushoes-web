import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderDetailDto {
  @IsMongoId()
  _id: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsString()
  @IsNotEmpty()
  shoesName: string;
}
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNumber()
  totalPrice: number;

  @IsString()
  type: string;

  @IsObject()
  @ValidateNested()
  @Type(() => OrderDetailDto)
  detail: OrderDetailDto;
}
