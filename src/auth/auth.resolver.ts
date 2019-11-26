import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, BaseUser } from './user.entity';
import { UseGuards, BadRequestException, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { GqlAuthGuard } from './gqlAuth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { PermissionLevel } from './permission-level.enum';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';

@Resolver(of => BaseUser)
export class AuthResolver {
  constructor(private readonly service: AuthService) {}

  @Query(returns => String)
  async signIn(@Args('username') username: string, @Args('password') password: string): Promise<String> {
    const token = await this.service.signIn(username, password);
    return token.accessToken;
  }

  @Query(returns => [BaseUser])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  async users(): Promise<BaseUser[]> {
    return this.service.getAllUsers();
  }

  @Query(returns => BaseUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  async isSignedIn(@GetUser() user: User | Boolean): Promise<BaseUser> {
    if (user instanceof UnauthorizedException || user === false)
      return null;
    else {
      const u = user as User;
      return {
        username: u.username,
        id: u.id,
        permissionLevel: u.permissionLevel,
      };
    }
  }

  @Mutation(returns => BaseUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  createUser(@Args('data') data: AuthCredentialsDto): Promise<BaseUser> {
    if (data.password == null)
       throw new BadRequestException('Please provide a password when creating a user.');

    return this.service.createUser(data);
  }

  @Mutation(returns => BaseUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  updateUser(@Args('id', ParseIntPipe) id: number, @Args('data') data: AuthCredentialsDto): Promise<BaseUser> {
    return this.service.updateUser(id, data);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  deleteUser(@Args('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }
}