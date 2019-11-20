import { IsNotEmpty, IsOptional } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  address: string;
}
