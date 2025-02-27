import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'todo title 1' })
  title: string;

  @ApiProperty({ example: true })
  completed: boolean;
}
