// user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterUserDto } from './register-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  async register(registerUserDto: RegisterUserDto): Promise<Pick<User, "email" | "id">> {
    const { email, password } = registerUserDto;

    // Check if user already exists
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("registering with email: " + email )

    // Create and save the user
    return await new Promise<User>((resolve, reject) => {})
  }
}
