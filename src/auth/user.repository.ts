import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, BaseUser } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { PermissionLevel } from './permission-level.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<BaseUser> {
    const { username, password, permissionLevel } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.permissionLevel = permissionLevel;

    try {
      await user.save();
      return {
        username: username,
        id: user.id,
        permissionLevel: user.permissionLevel,
      };
    } catch (error) {
      if (error.code === '23505')
        // Duplicate username
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async updateUser(
    user: User,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> {
    const { username, password, permissionLevel } = authCredentialsDto;

    user.username = username;
    if (password) {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
    }
    user.permissionLevel = permissionLevel;

    try {
      await user.save();
      return {
        username: username,
        id: user.id,
        permissionLevel: user.permissionLevel,
      };
    } catch (error) {
      if (error.code === '23505')
        // Duplicate username
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  validateUserPassword = async (
    username: string, password: string
  ): Promise<BaseUser> => {
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password)))
      return {
        username: user.username,
        id: user.id,
        permissionLevel: user.permissionLevel,
      };
    else return null;
  };

  hashPassword = async (password: string, salt: string): Promise<string> =>
    bcrypt.hash(password, salt);

  hasUsers = async (): Promise<boolean> => {
    const count = await this.count();
    return count > 0;
  };

  getAdminUser = async (): Promise<User> =>
    await this.findOne({ username: 'admin' });
  getAllAdmins = async (): Promise<User[]> =>
    await this.find({ permissionLevel: PermissionLevel.ADMIN });
  getAllUsers = async (): Promise<User[]> =>
    await this.createQueryBuilder('user')
      .orderBy('username', 'ASC')
      .getMany();
}
