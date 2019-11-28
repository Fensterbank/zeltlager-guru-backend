import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User, AuthUser } from './user.entity';
import { UseGuards, BadRequestException, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { GqlAuthGuard } from './gqlAuth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { PermissionLevel } from './permission-level.enum';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';

@Resolver(of => AuthUser)
export class AuthResolver {
  constructor(private readonly service: AuthService) { }

  @Mutation(returns => AuthUser)
  async signIn(@Args('username') username: string, @Args('password') password: string): Promise<AuthUser> {
    return this.service.signIn(username, password);
  }

  @Query(returns => [AuthUser])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  async users(): Promise<AuthUser[]> {
    return this.service.getAllUsers().then(users => users.map(user => ({
      username: user.username,
      id: user.id,
      permissionLevel: user.permissionLevel,
      accessToken: null,
    })));
  }

  @Query(returns => AuthUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async currentUser(@GetUser() user: User | Boolean): Promise<AuthUser> {
    // Throws unauthorized exception if user is not signed in
    const u = user as User;
    return {
      username: u.username,
      id: u.id,
      permissionLevel: u.permissionLevel,
      accessToken: null,
    };
  }

  @Mutation(returns => AuthUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  createUser(@Args('data') data: AuthCredentialsDto): Promise<AuthUser> {
    if (data.password == null)
      throw new BadRequestException('Please provide a password when creating a user.');

    return this.service.createUser(data);
  }

  @Mutation(returns => AuthUser)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  updateUser(@Args('id', ParseIntPipe) id: number, @Args('data') data: AuthCredentialsDto): Promise<AuthUser> {
    return this.service.updateUser(id, data);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(PermissionLevel.ADMIN)
  deleteUser(@Args('id', ParseIntPipe) id: number) {
    return this.service.deleteUser(id);
  }
}