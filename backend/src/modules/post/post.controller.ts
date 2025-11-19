import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() postDto: PostDto) {
    const post = await this.postService.createPost(postDto);
    return { message: 'Post created successfully', post };
  }

  @Get('/hot')
  async getPosts() {
    const posts = await this.postService.getTopEngagedPosts(1);
    return { message: 'Posts retrieved successfully', posts };
  }

  @Get('/new')
  async getNewPosts() {
    const posts = await this.postService.getLatestPosts(30);
    return { message: 'Posts retrieved successfully', posts };
  }

  @Get('/user/:id')
  async getUserPosts(@Param('id') userId: number) {
    const posts = await this.postService.getUserPosts(userId);
    return { message: 'Posts retrieved successfully', posts };
  }

  @Get(':id')
  async getPost(@Param('id') postId: number) {
    const post = await this.postService.getPost(postId);
    return { message: 'Post retrieved successfully', post };
  }
}
