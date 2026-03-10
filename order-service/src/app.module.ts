import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'postgres',
      password: 'postgres123',
      database: 'order_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrderModule,
  ],
})
export class AppModule {}