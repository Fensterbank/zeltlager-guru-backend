import { IsOptional, IsNotEmpty } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class SearchDto {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  skip: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  take: number;
}
