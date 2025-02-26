import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: { email: string; username: string }) {
    return this.userService.createUser(data);
  }

  @Post('register') 
  registerUser(@Body() data: { email: string; username: string; password: string }) {
    return this.userService.createUser(data);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
