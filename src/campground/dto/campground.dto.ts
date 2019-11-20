import { IsNotEmpty, IsOptional } from 'class-validator';

export class CampgroundDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  locationID: number;


  // it is possible to include location data to directly create / update a location

  @IsOptional()
  zip: string;

  @IsOptional()
  city: string;

  @IsOptional()
  address: string;

  @IsOptional()
  latitude: number;

  @IsOptional()
  longitude: number;
}
