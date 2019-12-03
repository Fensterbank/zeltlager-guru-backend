import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CampDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  url: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  teamCount: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  kidsCount: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  minAge: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  maxAge: number;

  @Field(type => Int)
  @IsNotEmpty()
  organisationID: number;

  @Field({ nullable: true })
  @IsOptional()
  pictureID: string;
}
