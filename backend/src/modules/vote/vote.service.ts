import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { Vote } from "./vote.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VoteDto } from "./vote.dto";
import { PostService } from "../post/post.service";

type VoteResponse = {
    success: boolean;
    message: string;
    post_deleted: boolean;
}


@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>,

        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
        ) {}

    async createVote(voteDto: VoteDto): Promise<VoteResponse> {
        const { user_id, post_id, vote_type } = voteDto;
        if (!await this.postExists(post_id)) {
            return {
                success: false,
                message: 'Post does not exist',
                post_deleted: true,
            }
        }
        const vote = this.voteRepository.create({ user_id, post_id, vote_type });
        await this.voteRepository.save(vote); 
        return this.checkPostNetVotes(post_id);
    }

    async deleteVote(voteId: number): Promise<VoteResponse> {
        if (!this.canContinueOperation(voteId)) { 
            return {
                success: false,
                message: 'Vote does not exist',
                post_deleted: true,
            }
        }
        
        
        const post_id = (await this.voteRepository.findOne({where: {id: voteId}})).post_id;
        await this.voteRepository.delete({ id: voteId });
        return this.checkPostNetVotes(post_id);
    }

    async getPostsByEngagement(hours : number) {
        let now = new Date();
        now.setHours(now.getHours() - hours);
        const posts = await this.voteRepository
            .createQueryBuilder('vote')
            .select('post_id')
            .addSelect('COUNT(*) as votes')
            .where('vote.last_updated >= :date', { date: now })
            .groupBy('post_id')
            .orderBy('votes', 'DESC')
            .getRawMany();
        return posts;
    }

    private async canContinueOperation(voteId : number) {
        //finish this!!!!
        const vote = await this.voteRepository.findOne({where: {id: voteId}});
        if (vote) {
            const post = await this.postService.getPost(vote.post_id);
            if (post) {
                return true;
            }
        }
        return false;
    }

    private async voteExists(voteId: number): Promise<boolean> {
        return (await this.voteRepository.findOne({where: {id: voteId}})) !== undefined || null;
    }
    

    private async postExists(postId: number): Promise<boolean> {
        return (await this.postService.getPost(postId)) !== undefined || null;
    }

    private async checkPostNetVotes(postId: number): Promise<VoteResponse> {

        //if the votes drop below 0, delete the post and all votes associated with it
        if (await this.getNetVotes(postId) < 0) {
            await this.voteRepository.delete({ post_id: postId });
            await this.postService.deletePost(postId);
            return {
                success: true,
                message: 'Post deleted successfully',
                post_deleted: true,
            }
        }
        return {
            success: true,
            message: 'Post updated successfully',
            post_deleted: false,
        }
    }

    async updateVote(voteDto: VoteDto): Promise<VoteResponse> {
        const { user_id, post_id, vote_type } = voteDto;
        if (!await this.postExists(post_id)) {
            return {
                success: false,
                message: 'Post does not exist',
                post_deleted: true,
            }
        }
        await this.voteRepository.update({ user_id, post_id }, { vote_type });
        return this.checkPostNetVotes(post_id);
    }

    async getNetVotes(postId: number): Promise<number> {
        const upvotes =  await this.voteRepository.count({where: { post_id: postId, vote_type: "upvote" }})
        const downvotes =  await this.voteRepository.count({where: { post_id: postId, vote_type: "downvote" }});
        return upvotes - downvotes;
    }

    async getVotesByUser(userId: number): Promise<Vote[]> {
        return this.voteRepository.find({where: { user_id: userId }});
    }




}