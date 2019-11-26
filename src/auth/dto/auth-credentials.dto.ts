import { IsString, MinLength, MaxLength, Matches, IsIn, IsOptional } from 'class-validator';
import { PermissionLevel } from '../permission-level.enum';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AuthCredentialsDto {
  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsOptional()
  password: string;

  @Field()
  @IsIn([
    PermissionLevel.ADMIN,
    PermissionLevel.DATA_MANAGER,
    PermissionLevel.USER,
  ])
  permissionLevel: PermissionLevel;
}
