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
  thumbnail: string;
  @IsNotEmpty()
  category: string;
  @IsArray()
  @IsString({ each: true })
  sliders: string[];
}
