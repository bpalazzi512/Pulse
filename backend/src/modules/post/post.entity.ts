import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
    
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;

    @Column()
    user_id: number;
}