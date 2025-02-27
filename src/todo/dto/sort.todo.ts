import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBooleanString, IsString, IsIn } from 'class-validator';

export class SortTodoDto {
  @ApiProperty({
    description: 'Filter by completed status',
    example: 'true',
    required: false,
  })
  @IsOptional()
  @IsBooleanString()
  status?: string; 
  
  @ApiProperty({
    description: 'Sort by createdAt or completedAt',
    example: 'createdAt',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['createdAt', 'completedAt'])
  sortBy?: string;

  @ApiProperty({
    description: 'Sorting order (asc or desc)',
    example: 'asc',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: string;
}
