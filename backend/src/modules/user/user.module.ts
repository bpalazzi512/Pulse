// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Registration } from './registration.entity';


@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET || 'your_secret_key', // Use environment variables
        signOptions: { expiresIn: '1h' }, // Token expiration
      }),
    TypeOrmModule.forFeature([User, Registration]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy]
})
export class UserModule {}
