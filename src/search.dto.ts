import { IsOptional, IsNotEmpty } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  skip: number;

  @IsOptional()
  @IsNotEmpty()
  take: number;
}
