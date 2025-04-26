import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  password: string;
  fullName: string;
  phone: string;
}
