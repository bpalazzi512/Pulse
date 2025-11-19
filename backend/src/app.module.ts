import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';
import { Registration } from './modules/user/registration.entity';
import { PostModule } from './modules/post/post.module';
import { Post } from './modules/post/post.entity';
import { Vote } from './modules/vote/vote.entity';
import { VoteModule } from './modules/vote/vote.module';
import { FrontendAccessMiddleware } from './access.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Registration, Post, Vote],
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    UserModule,
    PostModule,
    VoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendAccessMiddleware).forRoutes('*'); // Apply to all routes
  }
}
