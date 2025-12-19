import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<AuthUser | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const isValidPass = await bcrypt.compare(pass, user.password);
    if (!isValidPass) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, pass);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
