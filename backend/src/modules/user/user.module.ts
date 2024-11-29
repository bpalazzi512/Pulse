// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'your_secret_key', // Use environment variables
        signOptions: { expiresIn: '1h' }, // Token expiration
      }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
