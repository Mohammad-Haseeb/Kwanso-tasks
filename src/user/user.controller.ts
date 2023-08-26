import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { LoginResponse } from './dto/auth-response.dto';
import { AuthGuard } from './Auth.guard';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.userService.login(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async findOne(@Request() req): Promise<UserResponse> {
    return this.userService.findOne(req.user.id);
  }
}
