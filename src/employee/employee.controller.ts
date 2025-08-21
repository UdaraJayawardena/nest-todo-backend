import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee';

@ApiTags('Employee')
// @ApiBearerAuth()
@Controller('employee')
export class EmployeeController {

      constructor(private readonly employeeService: EmployeeService) { }
      @Post('register')
      @ApiOperation({ summary: 'Register a new employee' })
      @ApiResponse({ status: 200, description: 'Employee created successfully' })

      async registerEmployee(@Body() body: CreateEmployeeDto) {
        const { firstname, lastname, email, number, gender, photo } = body;
        try {
    
          const newEmployee = await this.employeeService.createEmployee(firstname, lastname, email, number, gender, photo  );
          return newEmployee;
    
        } catch (error) {
          
          if (error instanceof ConflictException) {
            throw error;
          }
          throw new Error('An error occurred while registering the employee');
        }
      }
    
      @Get()
      findAllEmployees() 
      {
        return this.employeeService.findAllEmployees();
      }

}
