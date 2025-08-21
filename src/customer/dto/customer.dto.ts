import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Customer {

  @Field(() => Int)
  id: number;

  @ApiProperty({ example: 'udara@example.com' })
  @Field()
  email: string;

  @ApiProperty({ example: 'udara@123' })
  @Field()
  username: string;

  @ApiProperty({ example: 'udara@123' })
  @Field()
  password: string;
}