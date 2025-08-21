import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Udara' })
  firstname: string;

  @ApiProperty({ example: 'Jayawardena' })
  lastname: string;

  @ApiProperty({ example: 'udara@example.com' })
  email: string;

  @ApiProperty({ example: '0771322785' })
  number: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  @ApiProperty({ example: 'https://picsum.photos/200/300'})
  photo: string;
}
