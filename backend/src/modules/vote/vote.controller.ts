import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteDto } from './vote.dto';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  async createVote(@Body() voteDto: VoteDto) {
    const vote = await this.voteService.createVote(voteDto);
    return { message: 'Vote created successfully', vote };
  }

  @Delete(':id')
  async deleteVote(@Param('id') voteId: number) {
    const vote = await this.voteService.deleteVote(voteId);
    return { message: 'Vote deleted successfully', vote };
  }

  @Put()
  async updateVote(@Body() voteDto: VoteDto) {
    const vote = await this.voteService.updateVote(voteDto);
    return { message: 'Vote updated successfully', vote };
  }

  @Get('/user/:id')
  async getVotesByUser(@Param('id') userId: number) {
    const votes = await this.voteService.getVotesByUser(userId);
    return { votes };
  }
}
