// import { ApiProperty } from '@nestjs/swagger';

// export class CreateCustomerDto {
//   @ApiProperty({ example: 'udara@example.com' })
//   email: string;

//   @ApiProperty({ example: 'udara@123' })
//   username: string;

//   @ApiProperty({ example: 'udara123' })
//   password: string;
// }


import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}