import { IsNotEmpty, Max, MaxLength } from "class-validator";

export class VoteDto {

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    post_id: number;

    @IsNotEmpty()
    vote_type: "upvote" | "downvote";

}