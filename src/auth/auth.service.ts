import { LoginInput } from './dto/login.input';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { RegisterInput } from './dto/register.input';
import { User } from '../users/users.entity';
import { ROLE } from '../users/users.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService
  ) {}

  async validateUser(input: LoginInput) {
    const user = await this.usersService.getUserByEmail(input.email);
    if (user && user.password === input.password) {
      const token = this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role,
        },
        {
          secret: 'JWT_SECRET_KEY',
        }
      );
      return token;
    }
    throw new HttpException(
      'Email or password is invalid!',
      HttpStatus.BAD_REQUEST
    );
  }

  async register(input: RegisterInput): Promise<boolean> {
    const user = await this.usersService.getUserByEmail(input.email);
    if (user) {
      throw new HttpException('User is exist!', HttpStatus.BAD_REQUEST);
    }
    await this.usersService.createUser(input);
    return true;
  }
}
