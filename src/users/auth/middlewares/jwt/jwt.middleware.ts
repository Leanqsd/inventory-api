import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { decode } from 'punycode';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ){}

  async use(req: any, res: any, next: () => void) {
    try{
      const tokenArray: string[] = req.headers['authorization'].split(' ');

      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

      if (decodedToken) {
        const user = await this.usersService.getOne(decodedToken.sub);
        if (user) next();
        else throw new UnauthorizedException('Invalid Token');
      }else {
        throw new UnauthorizedException('Invalid Token');
      }
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid Token')
    }
  }
}
