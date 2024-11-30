import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Timestamp } from 'typeorm'; // Import the Timestamp type from the typeorm package

@Entity('registration') 
export class Registration {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    email: string;
    
    @Column({ default: true })
    token: string;
    
    @Column()
    expiration: Date;

    @Column({ default: false })
    is_password_reset: boolean;
}