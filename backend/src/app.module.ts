import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
