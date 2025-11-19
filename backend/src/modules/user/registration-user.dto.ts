import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from './user.entity';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { IsSpecificDomainEmail } from './validators';

export class RegistrationUserDto implements Pick<User, 'email'> {
  @IsEmail()
  @IsSpecificDomainEmail('northeastern.edu')
  email: string;
}
