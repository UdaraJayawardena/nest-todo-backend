import { Injectable, ConflictException } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {

        constructor(private readonly prisma: PrismaService) { }
    
        // check if email already exists in the database
        async findByEmail(email: string) {
            return await this.prisma.customer.findFirst({
                where: {
                    OR: [
                        { email: email }
                    ]
                }
            });
        }
    
        // register a new customer
        async createCustomer(email: string, username: string, password: string) {
    
            // Ensure required fields are provided
            if (!email || !username || !password) {
                throw new Error('Fields are Empty');
            }
    
            // Check if email already exists
            const existingCustomer = await this.findByEmail(email);
    
            if (existingCustomer) {
                throw new ConflictException('Email already in use');
            }
    
    
            const newCustomer = await this.prisma.customer.create({
                data: { email, username, password },
            });
    
            const { ...updatedObj } = newCustomer;
    
            return updatedObj;
    
        }
    
        // fetch all customers
        async findAllCustomers() {
            const listOfCustomers = await this.prisma.customer.findMany();
            return listOfCustomers;
        }
}
