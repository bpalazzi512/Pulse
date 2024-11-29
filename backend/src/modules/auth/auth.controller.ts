// auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    //TODO 
    //validate user credentials with auth service
    const user = { id: 1, email: body.email, password: body.password }; // Replace with database user lookup
    return this.authService.login(user);
  }

}
