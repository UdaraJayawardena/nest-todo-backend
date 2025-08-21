import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { PrismaModule } from '../prisma/prisma.module';  // import here

@Module({
    imports: [PrismaModule],  // <-- important
  providers: [CustomerService, CustomerResolver], // resolver included here
    exports: [CustomerResolver], // export it so it can be injected elsewhere

})
export class CustomerModule { }
