import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VoteController } from "./vote.controller";
import { VoteService } from "./vote.service";
import { Vote } from "./vote.entity";
import { PostService } from "../post/post.service";
import { PostModule } from "../post/post.module";
import { Post } from "../post/post.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote, Post]),
        forwardRef(() => PostModule)
    ],
    controllers: [
        VoteController
    ],
    providers: [
        VoteService, PostService
    ],
    exports: [
        VoteService
    ]
})
export class VoteModule{}

//TODO:
//connect frontend, have dashboard send function to update vote count, then update backend on dashboard page
//make method to get votes by user for backend