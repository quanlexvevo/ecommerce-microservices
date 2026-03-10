import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';

class CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
}

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
update(@Param('id') id: string, @Body() dto: Partial<CreateProductDto>) {
  return this.productService.update(+id, dto);
}
}