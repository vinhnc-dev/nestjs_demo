import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/guards/role-guard/roles.decorator';
import { RolesGuard } from '../auth/guards/role-guard/roles.guard';
import { UserService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetNewCounselingBookingsInput, GetUserOutput } from './dto/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt.guard';
import {
  getLinkResetPasswordInput,
  resetPasswordInput,
} from './dto/reset-password.input';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles('user')
  @ApiResponse({
    status: 200,
    type: GetUserOutput,
  })
  @Get()
  async getUser(
    @CurrentUser() user: { id: number },
    @Query() params: GetNewCounselingBookingsInput
  ) {
    console.log(params);

    return this.userService.getUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('link-reset-pw')
  async getLinkResetPassword(@Body() input: getLinkResetPasswordInput) {
    return this.userService.getLinkResetPassword(input.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reset-pw/:resetToken')
  async isAllowResetPassword(@Param('resetToken') resetToken: string) {
    return this.userService.isAllowResetPassword(resetToken);
  }

  @UseGuards(JwtAuthGuard)
  @Put('reset-pw')
  async resetPassword(
    @Query() resetToken: string,
    @Body() input: resetPasswordInput
  ) {
    return this.userService.resetPassword(resetToken, input);
  }
}
