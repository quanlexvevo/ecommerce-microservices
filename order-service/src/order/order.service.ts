import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private httpService: HttpService,
  ) {}

  async create(userId: number, productId: number, quantity: number) {
  const { data: product } = await firstValueFrom(
    this.httpService.get(`http://localhost:3001/products/${productId}`)
  );

  const totalPrice = Number(product.price) * quantity;

  await firstValueFrom(
    this.httpService.put(`http://localhost:3001/products/${productId}`, {
      stock: product.stock - quantity,
    })
  );

  const order = this.orderRepo.create({ userId, productId, quantity, totalPrice });
  return this.orderRepo.save(order);
}

  async findAll(userId: number) {
    return this.orderRepo.find({ where: { userId } });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateStatus(id: number, status: string) {
    await this.orderRepo.update(id, { status });
    return this.findOne(id);
  }
}