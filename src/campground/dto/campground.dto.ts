import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CampgroundDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  url: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  locationID: number;


  // it is possible to include location data to directly create / update a location
  @Field({ nullable: true })
  @IsOptional()
  zip: string;

  @Field({ nullable: true })
  @IsOptional()
  city: string;

  @Field({ nullable: true })
  @IsOptional()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  lat: number;

  @Field({ nullable: true })
  @IsOptional()
  lng: number;
}
