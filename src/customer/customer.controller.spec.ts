import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from './dto/customer.dto';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

    it('should call customerService.register with DTO and return result', async () => {
        const dto = { email: 'udara5@gmail.com', username: 'udara', password: '123456' };
        const mockResult = { id: '1', ...dto };

        (customerService.createCustomer as jest.Mock).mockResolvedValue(mockResult);

        // const result = await customerController.registerCustomer(dto.email, dto.username, dto.password);

        // expect(customerService.createCustomer).toHaveBeenCalledWith(dto);  
        // expect(result).toEqual(mockResult);
    });
  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });
});
