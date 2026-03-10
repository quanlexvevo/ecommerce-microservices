import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';

class CreateOrderDto {
  userId: number;
  productId: number;
  quantity: number;
}

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto.userId, dto.productId, dto.quantity);
  }

  @Get('user/:userId')
  findAll(@Param('userId') userId: string) {
    return this.orderService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatus(+id, status);
  }
}