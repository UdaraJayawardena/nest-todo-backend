import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  createUser(@Body() username: string, email: string, password: string) {
    return this.userService.createUser(username, email, password);
  }

  @Post('register')
  registerUser(@Body() body: { username: string, email: string, password: string }) {
    const { username, email, password } = body;

    return this.userService.createUser(username, email, password);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
