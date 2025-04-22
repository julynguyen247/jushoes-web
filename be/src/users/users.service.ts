import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument> &
      SoftDeleteModel<UserDocument>,
  ) {}
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
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }
  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ email: username });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: id }, { ...updateUserDto });
  }

  async remove(id: string) {
    return this.userModel.delete({ _id: id });
  }
}
