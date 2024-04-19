import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class FiltersDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
