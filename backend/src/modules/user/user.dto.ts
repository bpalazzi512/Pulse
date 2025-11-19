import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from './user.entity';
import { IsSpecificDomainEmail } from './validators';

export class UserDto implements Pick<User, 'email' | 'password'> {
  @IsEmail()
  @IsSpecificDomainEmail('northeastern.edu')
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
