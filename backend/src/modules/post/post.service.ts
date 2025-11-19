import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { DetailedPost } from './detailedpost.entity';
import { VoteService } from '../vote/vote.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @Inject(forwardRef(() => VoteService))
    private readonly voteService: VoteService,
  ) {}

  async createPost(postDto: PostDto): Promise<Post> {
    const { content, user_id } = postDto;
    const post = this.postRepository.create({ content, user_id });
    const savedPost = await this.postRepository.save(post);
    const vote = await this.voteService.createVote({
      user_id,
      post_id: savedPost.id,
      vote_type: 'upvote',
    });
    return savedPost;
  }

  async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async getPostsWithVotes(): Promise<DetailedPost[]> {
    const posts = await this.postRepository.find();
    const postsToSend = await Promise.all(
      posts.map(async (post: Post) => {
        const netVotes = await this.voteService.getNetVotes(post.id);
        return {
          id: post.id,
          content: post.content,
          user_id: post.user_id,
          created_at: post.created_at,
          votes: netVotes,
        };
      }),
    );

    return postsToSend;
  }

  async getLatestPosts(limit: number): Promise<DetailedPost[]> {
    const posts = await this.postRepository.find({
      order: { created_at: 'DESC' }, // Sort by createdAt in descending order
      take: limit, // Limit the number of results
    });
    const postsToSend = await Promise.all(
      posts.map(async (post: Post) => {
        const netVotes = await this.voteService.getNetVotes(post.id);
        return {
          id: post.id,
          content: post.content,
          user_id: post.user_id,
          created_at: post.created_at,
          votes: netVotes,
        };
      }),
    );

    return postsToSend;
  }

  async getTopEngagedPosts(hours: number): Promise<DetailedPost[]> {
    const engagementData = await this.voteService.getPostsByEngagement(hours);
    const postIds = engagementData.map((data) => data.post_id);

    const posts = await this.postRepository.findByIds(postIds);
    const postsToSend = await Promise.all(
      posts.map(async (post: Post) => {
        const netVotes = await this.voteService.getNetVotes(post.id);
        return {
          id: post.id,
          content: post.content,
          user_id: post.user_id,
          created_at: post.created_at,
          votes: netVotes,
        };
      }),
    );

    if (postsToSend.length > 30) {
      return postsToSend.slice(0, 30);
    }

    return postsToSend;
  }

  async deletePost(postId: number): Promise<void> {
    await this.postRepository.delete(postId);
  }

  async getPost(postId: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id: postId } });
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.find({
      where: { user_id: userId },
    });
    const postsToSend = await Promise.all(
      posts.map(async (post: Post) => {
        const netVotes = await this.voteService.getNetVotes(post.id);
        return {
          id: post.id,
          content: post.content,
          user_id: post.user_id,
          created_at: post.created_at,
          votes: netVotes,
        };
      }),
    );

    return postsToSend;
  }
}
