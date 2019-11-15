import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User, BaseUser } from './user.entity';
import { GetUser } from './get-user.decorator';
import { ApiAuthGuard } from './apiAuth.guard';
import { Roles } from './roles.decorator';
import { PermissionLevel } from './permission-level.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/users')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  createUser(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    if (authCredentialsDto.password == null)
      throw new BadRequestException('Please provide a password when creating a user.');

    return this.authService.createUser(authCredentialsDto);
  }

  @Delete('/users/:id')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }

  @Patch('/users/:id')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    return this.authService.updateUser(id, dto);
  }

  @Get('/isSignedIn')
  @UseGuards(ApiAuthGuard)
  isSignedIn(@GetUser() user: User | boolean): BaseUser | boolean {
    if (user instanceof UnauthorizedException || user === false)
      return false;
    else {
      const u = user as User;
      return {
        username: u.username,
        id: u.id,
        permissionLevel: u.permissionLevel,
      };
    }
  }

  @Get('/users')
  @UseGuards(ApiAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  async getUsers(): Promise<BaseUser[]> {
    const users = await this.authService.getAllUsers();
    return users.map(u => ({
      id: u.id,
      username: u.username,
      permissionLevel: u.permissionLevel,
    }));
  }
}
