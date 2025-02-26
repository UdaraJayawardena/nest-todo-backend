import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [],
  controllers: [AppController, TodoController, UserController],
  providers: [AppService, PrismaService, TodoService, UserService],
})
export class AppModule {}
