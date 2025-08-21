import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './dto/customer.dto';
// import { Customer } from './customer.model'; // GraphQL model

@Resolver(of => Customer)
export class CustomerResolver {
    constructor(private readonly customerService: CustomerService) { }

    @Query(returns => [Customer])
    customers() {
        return this.customerService.findAllCustomers();
    }

    @Mutation(returns => Customer)
    createCustomer(
        @Args('email') email: string,
        @Args('username') username: string,
        @Args('password') password: string,
    ) {
        return this.customerService.createCustomer(email, username, password);
    }
}
