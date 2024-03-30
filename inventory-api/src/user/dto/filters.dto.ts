import { IsBoolean, IsOptional } from 'class-validator';

export class FiltersDto {
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
