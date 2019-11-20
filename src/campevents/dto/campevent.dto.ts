import { IsNotEmpty, IsOptional } from 'class-validator';
import { CampgroundDto } from '../../campground/dto/campground.dto';

export class CampEventDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  url: string;

  @IsOptional()
  motto: string;

  @IsNotEmpty()
  begin: Date;

  @IsNotEmpty()
  end: Date;

  @IsOptional()
  teamCount: number;

  @IsOptional()
  kidsCount: number;

  @IsNotEmpty()
  campID: number;

  @IsOptional()
  campgroundID: number;

  @IsOptional()
  campground: CampgroundDto;
}
