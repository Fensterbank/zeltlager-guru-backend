import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class OrganisationDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  url: string;

  @Field({ nullable: true })
  @IsOptional()
  religion: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  locationID: number;

  @Field({ nullable: true })
  @IsOptional()
  pictureID: string;


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
}
