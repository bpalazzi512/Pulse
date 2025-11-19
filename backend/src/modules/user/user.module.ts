// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Registration } from './registration.entity';
import { EmailService } from './email.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // Use environment variables
      signOptions: {
        algorithm: 'HS256', // Specify the signing algorithm
        noTimestamp: true,
      }, // Token expiration
    }),
    TypeOrmModule.forFeature([User, Registration]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, EmailService],
  exports: [JwtStrategy],
})
export class UserModule {}
