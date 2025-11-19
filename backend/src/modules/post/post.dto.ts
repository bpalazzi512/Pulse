import { IsNotEmpty, Max, MaxLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MaxLength(500)
  content: string;

  @IsNotEmpty()
  user_id: number;
}
