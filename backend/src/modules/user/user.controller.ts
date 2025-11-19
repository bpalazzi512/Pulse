// user.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RegistrationUserDto } from './registration-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/registration/:token')
  async getRegistrationInfo(@Req() req: any) {
    const registration = await this.userService.getRegistrationInfo(
      req.params.token,
    );
    return {
      message: 'Registration information retrieved successfully',
      registration,
    };
  }

  @Post('register')
  async register(@Body() registerUserDto: RegistrationUserDto) {
    const registration =
      await this.userService.createRegistration(registerUserDto);
    return {
      message: 'Registration link created successful',
      registration: { id: registration.id },
    };
  }

  @Post('register/confirm')
  async confirmRegistration(@Body() registerUserDto: UserDto) {
    const user = await this.userService.register(registerUserDto);
    return { message: 'User registered successfully', user };
  }

  //TODO
  //make a create user endpoint

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me() {
    return { message: 'User information retrieved successfully' };
  }

  @Post('login')
  async login(@Body() userDto: UserDto) {
    const response = await this.userService.login(userDto);
    return response;
  }
}
