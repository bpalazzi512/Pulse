import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/interfaces/user';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: User) {
    const payload = { email: user.email, id: user.id }; // Customize as needed
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
