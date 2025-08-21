import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo';
import { UpdateTodoDto } from './dto/update-todo';
import { SortTodoDto } from './dto/sort.todo';
import { FilterDto } from './dto/filter.todo';
import { GetUser } from '../auth/decorators/getUser';

@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new Todo' })
    @ApiResponse({ status: 200, description: 'Successfully created' })
    createTodo(@Body() body: CreateTodoDto,
        @Req() request: Request) {
        const userId = request.user.userId
        return this.todoService.createTodo(userId, body);
    }

    @Patch('update/:id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a new Todo' })
    @ApiResponse({ status: 200, description: 'Successfully Updated' })
    async updateTodo(
        @Param('id') id: string,
        @Body() body: UpdateTodoDto
    ) {
        return this.todoService.updateTodo(Number(id), body.completed);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard)    
    @ApiOperation({ summary: 'Delete a new Todo' })
    @ApiResponse({ status: 200, description: 'Successfully Deleted' })
    async deleteTodo(@Param('id') id: string) {
        return this.todoService.deleteTodo(Number(id));
    }

    @Get('sort')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Retrieve a list of todos sorted based on query params and ordered in ascending or descending order' })
    async getTodos(
        /*
          status -> true' or 'false' for completed or uncompleted
          sort by date -> 'createdAt' or 'completedAt'
          order -> 'asc' or 'desc' for sorting order
        */
        @Query() { status, sortBy, order }: SortTodoDto,
        @Req() request: Request,
        @GetUser('userId') userId: number
    ) {
        console.log(userId);

        // const userId = request.user.userId       // Get the userId from JWT token
        // console.log(userId);

        const statusBool = status === 'true';

        const sortByField = sortBy === 'completedAt' ? 'completedAt' : 'createdAt';
        const sortOrder = order === 'asc' ? 'asc' : 'desc';

        return this.todoService.getTodos(statusBool, sortByField, sortOrder, userId);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Filter todo list by the status' })
    async filterByStatus(
        @Query() filterDto: FilterDto,
        @Req() request: Request,
    ) {
        const userId = request.user.userId       // Get the userId from JWT token
        let statusFilter: boolean | null = null;

        if (filterDto.filter === 'completed') {
            statusFilter = true;
        } else if (filterDto.filter === 'uncompleted') {
            statusFilter = false;
        }

        return this.todoService.filterByStatus(statusFilter, userId);
    }
}




