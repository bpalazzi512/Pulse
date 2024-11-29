// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // Use environment variables
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule], // Export if needed in other modules
})
export class AuthModule {}
