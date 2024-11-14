import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { UserDto } from './users.dto';
import { AuthService } from 'src/auth/auth.service';
import { queryObjects } from 'v8';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly repo: Repository<UserDto>,
        private readonly authService: AuthService,
    ) {}

    async register(user: UserDto) {
        try {
            if (!user.password) throw new UnauthorizedException('no password');

            const hash = await this.authService.hashPassword(user.password)
            user.password = hash

            const result = await this.repo.save(user);
            return result;
        } catch (err: any) {
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }

    async getOne(id: number): Promise<UserDto> {
        try {
            const user = await this.repo.findOne( { where: { id } });

            if (!user) throw new NotFoundException('user not found');
            
            return user
        }catch(err){
            console.error(err);
            if (err instanceof QueryFailedError)
                throw new HttpException(`${err.name} ${err.driverError}`, 404);
            throw new HttpException(err.message, err.status);
        }
    }
}
