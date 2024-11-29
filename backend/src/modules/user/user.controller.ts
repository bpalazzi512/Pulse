// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: UserDto) {
    const user = await this.userService.register(registerUserDto);
    return { message: 'Registration successful', user };
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const {email, password} = userDto;

    //TODO 
    //validate user credentials with auth service
     // Replace with database user lookup
    const response = await this.userService.login(userDto);
    return response;
  }
}
