import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; username: string }) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany();
  }
}
