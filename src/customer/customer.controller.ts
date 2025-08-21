import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer';
import { CustomerResolver } from './customer.resolver';
import { Customer } from './dto/customer.dto';

@ApiTags('Customer')
// @ApiBearerAuth()
@Controller('customer')
export class CustomerController {

  // constructor(private readonly customerService: CustomerService) { }
  constructor(private readonly customerResolver: CustomerResolver) { }

  @Post('register')
  @ApiOperation({ summary: 'register a new customer' })
  @ApiResponse({ status: 200, description: 'customer created successfully' })
  // async registerCustomer(@Body() body: { email: string; username: string; password: string }) {
  async registerCustomer(@Body() body: Customer) {

    try {

      return this.customerResolver.createCustomer(body.email, body.username, body.password);

    } catch (error) {

      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('An error occurred while registering the employee');
    }
  }

  // async registerCustomer(@Body() body: { email: string; username: string; password: string }): Promise<Customer> {


  @Get()
  findAllEmployees() {
    // return this.customerService.findAllCustomers();
  }

}
