import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../auth/user.repository';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
import { PermissionLevel } from '../../auth/permission-level.enum';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly userRepository: UserRepository,
  ) {}

  async seed() {
    this.logger.log('Start seeding...');
    // const dto = new GetMasterDataFilterDto();
    // const profiles = await this.profilesService.getProfiles(dto);
    // console.log('Profiles:', profiles);

    const hasUsers = await this.userRepository.hasUsers();
    if (!hasUsers) {
      this.logger.log(
        'No users existing. Create initial admin user with default credentials...',
      );
      const credentials = new AuthCredentialsDto();
      credentials.username = 'admin';
      credentials.password = 'admin1234';
      credentials.permissionLevel = PermissionLevel.ADMIN;

      await this.userRepository.signUp(credentials);
    }
  }
}
