import { Injectable,  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }

    async comparePassword(
        password: string,
        hashPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }
    
    constructor( private readonly jwtService: JwtService
     ) {}

    async verifyJwt(jwt: string): Promise<any>{
        return await this.jwtService.verifyAsync(jwt)
    }

    async generateJwt(user: UserDto): Promise<string> {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return this.jwtService.signAsync(payload);
    }
}


