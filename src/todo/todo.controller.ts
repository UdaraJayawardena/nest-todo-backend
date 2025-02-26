import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post('create')
    createTodo(@Body() data: { userId: number; title: string; completed: boolean }) {
        return this.todoService.createTodo(data);
    }

    @Patch('update/:id')
    async updateTodo(
        @Param('id') id: string,
        @Body() body: { title: string; completed: boolean }
    ) {
        return this.todoService.updateTodo(Number(id), body.completed);
    }

    @Delete('delete/:id')
    async deleteTodo(@Param('id') id: string) {
        return this.todoService.deleteTodo(Number(id));
    }

    // Fetch todos with different sorting methods based on query parameters
    @Get('sort')
    @UseGuards(JwtAuthGuard)
    async getTodos(
        @Query('status') status: string,   // 'true' or 'false' for completed/uncompleted
        @Query('sortBy') sortBy: string,   // 'createdAt' or 'completedAt'
        @Query('order') order: string,      // 'asc' or 'desc' for sorting order
        @Req() request: Request,               // Get the request to access logged-in user 
    ) {
        const userId = request.user.userId       // Get the userId from JWT token
        console.log(userId);

        const statusBool = status === 'true';

        const sortByField = sortBy === 'completedAt' ? 'completedAt' : 'createdAt';
        const sortOrder = order === 'asc' ? 'asc' : 'desc';

        return this.todoService.getTodos(statusBool, sortByField, sortOrder, userId);
    }


    @Get('status')
    @UseGuards(JwtAuthGuard)
    async filterByStatus(
        @Query('filter') filter: string,   // 'all', 'completed', or 'uncompleted'
        @Req() request: Request, 
    ) {
        const userId = request.user.userId       // Get the userId from JWT token
        let statusFilter: boolean | null = null;

        if (filter === 'completed') {
            statusFilter = true;  // Only completed to-dos
        } else if (filter === 'uncompleted') {
            statusFilter = false; // Only uncompleted to-dos
        }

        return this.todoService.filterByStatus(statusFilter, userId);
    }
}
