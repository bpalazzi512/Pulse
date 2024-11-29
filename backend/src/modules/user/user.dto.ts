import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from './user.entity';

export class UserDto implements Pick<User, "email" | "password"> {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}