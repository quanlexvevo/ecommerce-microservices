import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@Controller()
export class GatewayController {
  constructor(private gatewayService: GatewayService) {}

  // AUTH
  @Post('auth/register')
  register(@Body() body: any) {
    return this.gatewayService.forwardRequest('http://localhost:3003/auth/register', 'POST', body);
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.gatewayService.forwardRequest('http://localhost:3003/auth/login', 'POST', body);
  }

  // PRODUCTS
  @Get('products')
  @UseGuards(AuthGuard)
  getProducts() {
    return this.gatewayService.forwardRequest('http://localhost:3001/products', 'GET');
  }

  @Post('products')
  @UseGuards(AuthGuard)
  createProduct(@Body() body: any) {
    return this.gatewayService.forwardRequest('http://localhost:3001/products', 'POST', body);
  }

  @Get('products/:id')
  @UseGuards(AuthGuard)
  getProduct(@Param('id') id: string) {
    return this.gatewayService.forwardRequest(`http://localhost:3001/products/${id}`, 'GET');
  }

  @Put('products/:id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return this.gatewayService.forwardRequest(`http://localhost:3001/products/${id}`, 'PUT', body);
  }

  // ORDERS
  @Post('orders')
  @UseGuards(AuthGuard)
  createOrder(@Body() body: any) {
    return this.gatewayService.forwardRequest('http://localhost:3002/orders', 'POST', body);
  }

  @Get('orders/user/:userId')
  @UseGuards(AuthGuard)
  getUserOrders(@Param('userId') userId: string) {
    return this.gatewayService.forwardRequest(`http://localhost:3002/orders/user/${userId}`, 'GET');
  }
}