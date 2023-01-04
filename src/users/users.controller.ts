import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/guards/role-guard/roles.decorator';
import { RolesGuard } from '../auth/guards/role-guard/roles.guard';
import { UserService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserOutput } from './dto/user.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
    constructor (private readonly userService: UserService){}
    @UseGuards(RolesGuard)
    @Roles('admin')
    @ApiResponse({
        status: 200,
        type: GetUserOutput,
    })
    @Get()
    async getUser(){        
        return this.userService.getUser(1);
    }
}
