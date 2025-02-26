import { Controller, Get, Post, Body, UseGuards, ConflictException } from '@nestjs/common';
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
  async registerUser(@Body() body: { username: string, email: string, password: string }) {
    const { username, email, password } = body;
    try {

      const newUser = await this.userService.createUser(username, email, password);
      return newUser;

    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('An error occurred while registering the user');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllUsers() {
    return this.userService.findAllUsers();
  }
}
