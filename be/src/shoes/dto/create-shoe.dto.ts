import { IsNotEmpty } from 'class-validator';

export class CreateShoeDto {
  @IsNotEmpty()
  mainText: string;
  @IsNotEmpty()
  brand: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  quantity: number;
}
