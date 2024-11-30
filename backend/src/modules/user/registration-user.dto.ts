import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from './user.entity';

export class RegistrationUserDto implements Pick<User, "email" > {
    @IsEmail()
  email: string;
} 