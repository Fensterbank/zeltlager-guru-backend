import { IsNotEmpty, IsOptional } from 'class-validator';

export class CampDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  teamCount: number;

  @IsOptional()
  kidsCount: number;

  @IsOptional()
  minAge: number;

  @IsOptional()
  maxAge: number;

  @IsNotEmpty()
  organisationID: number;
}
