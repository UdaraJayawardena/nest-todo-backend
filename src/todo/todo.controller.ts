import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';

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
    @Get('todos')
    async getTodos(
        @Query('status') status: string,   // 'true' or 'false' for completed/uncompleted
        @Query('sortBy') sortBy: string,   // 'createdAt' or 'completedAt'
        @Query('order') order: string      // 'asc' or 'desc' for sorting order
    ) {
        // Convert status to boolean
        const statusBool = status === 'true';

        // Default sorting is by 'createdAt' in descending order if no parameters are passed
        const sortByField = sortBy === 'completedAt' ? 'completedAt' : 'createdAt';
        const sortOrder = order === 'asc' ? 'asc' : 'desc';

        return this.todoService.getTodos(statusBool, sortByField, sortOrder);
    }


    @Get('status')
    async filterByStatus(
        @Query('filter') filter: string,   // 'all', 'completed', or 'uncompleted'
    ) {
        let statusFilter: boolean | null = null;

        if (filter === 'completed') {
            statusFilter = true;  // Only completed to-dos
        } else if (filter === 'uncompleted') {
            statusFilter = false; // Only uncompleted to-dos
        }

        return this.todoService.filterByStatus(statusFilter);
    }
}
