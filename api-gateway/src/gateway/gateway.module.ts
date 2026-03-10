import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({ secret: 'supersecretkey' }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService, AuthGuard],
})
export class GatewayModule {}