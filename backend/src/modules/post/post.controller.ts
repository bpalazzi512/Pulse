import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostDto } from "./post.dto";


@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() postDto: PostDto) {
        const post = await this.postService.createPost(postDto);
        return { message: 'Post created successfully', post };
    }

    @Get()
    async getPosts() {
        const posts = await this.postService.getPosts();
        return { message: 'Posts retrieved successfully', posts };
    }


}