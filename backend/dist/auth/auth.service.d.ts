import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
interface AuthUser {
    id: number;
    email: string;
    role: Role;
}
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<AuthUser | null>;
    signIn(email: string, pass: string): Promise<{
        access_token: string;
    }>;
}
export {};
