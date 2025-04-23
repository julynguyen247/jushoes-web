import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoesService } from 'src/shoes/shoes.service';
import aqp from 'api-query-params';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument> &
      SoftDeleteModel<OrderDocument>,
    private readonly shoesService: ShoesService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const shoeId = createOrderDto.detail._id;
    const shoe = await this.shoesService.findById(shoeId);
    if (!shoe) {
      throw new NotFoundException(`Shoe with ID ${shoeId} does not exist`);
    }
    return this.orderModel.create({ ...createOrderDto });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, population, sort } = aqp(qs);
    delete filter.page;
    delete filter.limit;
    let offset = (+currentPage - 1) * +limit;
    let defaultLimit = +limit ? +limit : 10;
    const totalItems = (await this.orderModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.orderModel
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
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.updateOne({ _id: id }, { ...updateOrderDto });
  }

  async remove(id: number) {
    return await this.orderModel.deleteOne({ _id: id });
  }
}
