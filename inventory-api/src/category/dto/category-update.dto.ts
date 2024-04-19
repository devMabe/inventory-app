import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;
}
