import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/guards/role-guard/roles.decorator';
import { RolesGuard } from '../auth/guards/role-guard/roles.guard';
import { UserService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserOutput } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt.guard';
import { ResetPasswordInput } from './dto/reset-password.input';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @ApiResponse({
    status: 200,
    type: GetUserOutput,
  })
  @Get()
  async getUser(@CurrentUser() user: { id }) {
    return this.userService.getUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async getLinkResetPassword(@Body() input: ResetPasswordInput) {
    return this.userService.getLinkResetPassword(input.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async resetUserPassword(@Body() input: ResetPasswordInput) {
    return this.userService.getResetPassword(input.email);
  }
}
