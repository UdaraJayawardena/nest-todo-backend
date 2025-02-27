import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterDto {
  
  @ApiProperty({
    description: "Filter by status ('all', 'completed', or 'uncompleted')",
    example: 'completed',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['all', 'completed', 'uncompleted'])
  filter?: string;
}
