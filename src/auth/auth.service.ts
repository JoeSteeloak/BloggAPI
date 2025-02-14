import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    // Mockad användarvalidering – byt ut mot riktig databaslogik senare
    private users = [
        { id: 1, username: 'admin', password: 'password' },
        { id: 2, username: 'user', password: '1234' },
    ];

    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find(
            (user) => user.username === username && user.password === password,
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Ta bort lösenordet innan vi returnerar användaren
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
