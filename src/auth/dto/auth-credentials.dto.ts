import { IsString, MinLength, MaxLength, Matches, IsIn, IsOptional } from 'class-validator';
import { PermissionLevel } from '../permission-level.enum';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(40)
  @IsOptional()
  password: string;

  @IsIn([
    PermissionLevel.ADMIN,
    PermissionLevel.DATA_MANAGER,
    PermissionLevel.USER,
  ])
  permissionLevel: PermissionLevel;
}
