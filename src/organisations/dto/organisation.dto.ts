import { IsNotEmpty, IsOptional } from 'class-validator';

export class OrganisationDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  url: string;

  @IsOptional()
  religion: string;

  @IsOptional()
  locationID: number;


  // it is possible to include location data to directly create / update a location

  @IsOptional()
  zip: string;

  @IsOptional()
  city: string;

  @IsOptional()
  address: string;
}
