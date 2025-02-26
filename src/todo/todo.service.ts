import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) { }

    // Create
    async createTodo(data: { userId: number; title: string, completed: boolean }) {
        return await this.prisma.todo.create({
            data,
        });
    }

    // Update
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
        // Build dynamic sorting order
        const orderBy: any = {
            [sortBy]: order === 'asc' ? 'asc' : 'desc',
        };

        // Fetch todos with sorting and filtering by status (completed/uncompleted)
        return this.prisma.todo.findMany({
            where: {
                userId: userId,  // Filter by userId
                completed: status, // Filter by completed or uncompleted based on status query
            },
            orderBy: orderBy,  // Apply dynamic sorting
        });
    }

    // Fetch todos with dynamic filtering based on query params
    async filterByStatus(status: boolean | null, userId: number) {
        const where = status !== null ? { completed: status, userId } : {};

        // Fetch todos with filtering (if needed)
        return this.prisma.todo.findMany({
            where,  // Apply filter on completed status
        });
    }
}
