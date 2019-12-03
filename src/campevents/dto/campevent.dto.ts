import { IsNotEmpty, IsOptional } from 'class-validator';
import { CampgroundDto } from '../../campground/dto/campground.dto';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class CampEventDto {
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
  motto: string;

  @Field()
  @IsNotEmpty()
  begin: Date;

  @Field()
  @IsNotEmpty()
  end: Date;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  teamCount: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  kidsCount: number;

  @Field(type => Int)
  @IsNotEmpty()
  campID: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  campgroundID: number;

  @Field(type => CampgroundDto, { nullable: true })
  @IsOptional()
  campground: CampgroundDto;

  @Field({ nullable: true })
  @IsOptional()
  pictureID: string;
}
