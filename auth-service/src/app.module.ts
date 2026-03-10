import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres123',
      database: 'auth_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'supersecretkey',
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
  ],
})
export class AppModule {}