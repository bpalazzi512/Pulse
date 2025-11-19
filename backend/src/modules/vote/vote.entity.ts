import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @Column()
  vote_type: 'upvote' | 'downvote';

  @Column()
  last_updated: Date;
}
