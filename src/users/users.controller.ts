import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/guards/role-guard/roles.decorator';
import { RolesGuard } from '../auth/guards/role-guard/roles.guard';
import { UserService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserOutput } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiResponse({
    status: 200,
    type: GetUserOutput,
  })
  @Get()
  async getUser(@CurrentUser() user: { id }) {
    return this.userService.getUser(user.id);
  }

  @Put()
  async resetUserPassword(@CurrentUser() user: { id }) {
    return this.userService.getUser(user.id);
  }
}
