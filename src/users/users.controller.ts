import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Post()
    async register(@Body() user: UserDto, @Res() response: Response) {
        const result = await this.service.register(user);
        response
            .status(HttpStatus.CREATED)
            .json({ok: true, result, msg: 'created'});
    }

}
