import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User, BaseUser } from './user.entity';
import { PermissionLevel } from './permission-level.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  createUser = async (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<BaseUser> => this.userRepository.signUp(authCredentialsDto);

  updateUser = async (
    id: number,
    dto: AuthCredentialsDto,
  ): Promise<BaseUser> => {
    const entity = await this.getUserById(id);
    return await this.userRepository.updateUser(entity, dto);
  };

  deleteUser = async (id: number): Promise<void> => {
    const user = await this.getUserById(id);
    // Prevent the deletion of the last existing administrator
    if (user.permissionLevel === PermissionLevel.ADMIN) {
      const admins = await this.userRepository.getAllAdmins();
      if (admins.length <= 1)
        throw new ConflictException(
          'You cannot delete the last existing administrator',
        );
    }

    let result;
    try {
      result = await this.userRepository.delete(id);
    } catch (error) {
      console.log('Fehler', error.code);
      throw error;
    }

    if (result && result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);
  };

  getUserById = async (id: number): Promise<User> => {
    const entity = await this.userRepository.findOne(id);

    if (!entity) throw new NotFoundException(`User with ID ${id} not found`);
    return entity;
  };

  signIn = async (username: string, password: string): Promise<{ accessToken: string; user: BaseUser }> => {
    const user = await this.userRepository.validateUserPassword(username, password);

    if (!user) throw new UnauthorizedException('Invalid username or password');

    const payload: JwtPayload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        username: user.username,
        id: user.id,
        permissionLevel: user.permissionLevel,
      },
    };
  };

  getAllUsers = async (): Promise<User[]> => {
    return await this.userRepository.getAllUsers();
  };
}
