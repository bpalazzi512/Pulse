import { Module, forwardRef } from '@nestjs/common';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { VoteModule } from '../vote/vote.module';
import { VoteService } from '../vote/vote.service';
import { Vote } from '../vote/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Vote]),
    forwardRef(() => VoteModule),
  ],
  controllers: [PostController],
  providers: [PostService, VoteService],
  exports: [PostService],
})
export class PostModule {}
