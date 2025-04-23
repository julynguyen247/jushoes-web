import { Injectable } from '@nestjs/common';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { Shoes, ShoesDocument } from './schemas/shoe.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class ShoesService {
  constructor(
    @InjectModel(Shoes.name)
    private readonly shoesModel: Model<ShoesDocument> &
      SoftDeleteModel<ShoesDocument>,
  ) {}
  async create(createShoeDto: CreateShoeDto) {
    return await this.shoesModel.create({ ...createShoeDto });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, population, sort } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.shoesModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.shoesModel
      .find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
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

  findOne(id: number) {
    return `This action returns a #${id} shoe`;
  }
  async findById(id: string) {
    return this.shoesModel.findById(id);
  }

  async update(id: string, updateShoeDto: UpdateShoeDto) {
    return await this.shoesModel.updateOne({ _id: id }, { ...updateShoeDto });
  }

  async remove(id: string) {
    return await this.shoesModel.deleteOne({ _id: id });
  }
}
