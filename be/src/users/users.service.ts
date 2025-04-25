import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { SoftDeleteModel } from 'mongoose-delete';
import aqp from 'api-query-params';

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
      phone: createUserDto.phone,
      role: 'USER',
    });
    return user;
  }
  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }
  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, population, sort } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.userModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .select('-password -deleted -refreshToken')
      .exec();

    return {
      meta: {
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages, //tổng số trang với điều kiện query
        total: totalItems, // tổng số phần tử (số bản ghi)
      },
      result, //kết quả query
    };
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
  updateUserToken = async (refreshToken: string, _id: string) => {
    return await this.userModel.updateOne({ _id: _id }, { refreshToken });
  };
  findUserByToken = async (refreshToken: string) => {
    return await this.userModel.findOne({ refreshToken });
  };
}
