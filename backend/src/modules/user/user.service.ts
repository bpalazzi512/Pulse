// user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(private readonly jwtService: JwtService) {}

  async register(registerUserDto: UserDto): Promise<Pick<User, "email" | "id">> {
    const { email, password } = registerUserDto;

    // Check if user already exists
    

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("registering with email: " + email )

    // Create and save the user
    return { email, id: 1 };
  }


  async login(userDto: UserDto) {
    const { email, password } = userDto;

    //verify that it works here 
    const payload = { email: email, id: 1 }; // Customize as needed
    return {
        user: payload,
        access_token: this.jwtService.sign(payload),
    };
  }


}
