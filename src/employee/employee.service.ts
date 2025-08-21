import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeeService {
    constructor(private readonly prisma: PrismaService) { }

    // Check if email already exists in the database
    async findByEmail(email: string) {
        return await this.prisma.employee.findFirst({
            where: {
                OR: [
                    { email: email }
                ]
            }
        });
    }


    // Register a new Employee
    async createEmployee(firstname: string, lastname: string, email: string, number: string, gender: string, photo: string) {

        // Ensure required fields are provided
        if (!firstname || !lastname || !email || !number || !gender) {
            throw new Error('Fields are Empty');
        }

        // Check if email already exists
        const existingEmployee = await this.findByEmail(email);

        if (existingEmployee) {
            throw new ConflictException('Email already in use');
        }


        const newEmployee = await this.prisma.employee.create({
            data: { firstname, lastname, email, number, gender, photo },
        });

        const { ...updatedObj } = newEmployee;

        return updatedObj;

    }

    // Fetch all employees
    async findAllEmployees() {
        const listOfEmployees = await this.prisma.employee.findMany();
        return listOfEmployees;
    }
}
