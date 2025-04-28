import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateShoeDto {
  @IsNotEmpty()
  mainText: string;
  @IsNotEmpty()
  brand: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  thumbnail: string;
  @IsArray()
  slider: string[];
}
