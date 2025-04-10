import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(createUserDto.password, salt);
    let user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      fullName: createUserDto.fullName,
    });
    return user;
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, { ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
