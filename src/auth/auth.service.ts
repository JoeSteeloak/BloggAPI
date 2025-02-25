import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    // Hårdkodade användare
    private users = [
        { id: 1, email: 'admin@admin.com', password: 'password' },
        { id: 2, email: 'user@user.com', password: '1234' },
    ];

    async validateUser(email: string, password: string): Promise<any> {
        const user = this.users.find(
            (user) => user.email === email && user.password === password,
        );

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Ta bort lösenordet innan vi returnerar användaren
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
            user:{
            id: user.id,
            email: user.email}
        };
    }
    async validateToken(token: string): Promise<any> {
        try {
            const decoded = this.jwtService.verify(token);
            return { 
                user: { 
                    id: decoded.sub, 
                    email: decoded.email 
                }, 
                valid: true  };
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
