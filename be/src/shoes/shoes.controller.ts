import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';

@Controller('shoes')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

  @Post()
  create(@Body() createShoeDto: CreateShoeDto) {
    return this.shoesService.create(createShoeDto);
  }

  @Get()
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.shoesService.findAll(+currentPage, +limit, qs);
  }
  @Get('/categories')
  getCategories() {
    return ['Sneakers', 'Sports'];
  }
  @Get('/brands')
  getBrands() {
    return ['Nike', 'Adidas', 'Puma', 'New Balance', 'Converse'];
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoeDto: UpdateShoeDto) {
    return this.shoesService.update(id, updateShoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoesService.remove(id);
  }
}
