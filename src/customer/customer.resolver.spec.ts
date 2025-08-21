import { Test, TestingModule } from '@nestjs/testing';
import { CustomerResolver } from '../../src/customer/customer.resolver';
import { CustomerService } from '../../src/customer/customer.service';

describe('CustomerResolver', () => {
    let resolver: CustomerResolver;
    let service: CustomerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CustomerResolver,
                {
                    provide: CustomerService,
                    useValue: { register: jest.fn() }
                },
            ],
        }).compile();

        resolver = module.get<CustomerResolver>(CustomerResolver);
        service = module.get<CustomerService>(CustomerService);
    });

    it('should call customerService.register with DTO and return result', async () => {
        const dto = { email: 'udara5@gmail.com', username: 'udara', password: '123456' };
        const mockResult = { id: '1', ...dto };

        (service.createCustomer as jest.Mock).mockResolvedValue(mockResult);

        const result = await resolver.createCustomer(dto.email, dto.username, dto.password);

        expect(service.createCustomer).toHaveBeenCalledWith(dto);  
        expect(result).toEqual(mockResult);
    });
});


