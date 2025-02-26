import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(username: string, email: string, password: string) {
    if (!username && !password) {
      throw new Error('Username & Password is required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }
}
