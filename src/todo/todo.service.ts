import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo';
@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) { }

    // Create one
    async createTodo(userId: number, createTodoDto: CreateTodoDto) {
        return await this.prisma.todo.create({
            data: {
                userId,
                ...createTodoDto,
            },
        });
    }

    // Update one
    async updateTodo(id: number, completed: boolean) {
        return this.prisma.todo.update({
            where: { id },
            data: {
                completed,
                completedAt: completed ? new Date() : null,
            },
        });
    }

    // Delete One
    async deleteTodo(id: number) {
        return this.prisma.todo.delete({
            where: { id },
        });
    }


    // Fetch todos with dynamic sorting and filtering based on query params
    async getTodos(status: boolean, sortBy: string, order: string, userId: number) {

        const orderBy: any = {
            [sortBy]: order === 'asc' ? 'asc' : 'desc',
        };

        return this.prisma.todo.findMany({
            where: {
                userId: userId,
                completed: status,
            },
            orderBy: orderBy,
        });
    }

    // Fetch todos with dynamic filtering based on query params
    async filterByStatus(status: boolean | null, userId: number) {
        const where = status !== null ? { completed: status, userId } : {};

        return this.prisma.todo.findMany({
            where,
        });
    }
}
