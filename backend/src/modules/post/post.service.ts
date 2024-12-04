import { Injectable } from "@nestjs/common";
import { Post } from "./post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PostDto } from "./post.dto";






@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly userRepository: Repository<Post>,

        ) {}

    async createPost(postDto: PostDto): Promise<Post> {
        const { content, user_id } = postDto;
        const post = this.userRepository.create({ content, user_id });
        return this.userRepository.save(post);
    }

    async getPosts(): Promise<Post[]> {
        return this.userRepository.find();
    }




}