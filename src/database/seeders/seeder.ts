// import { Injectable, Logger } from '@nestjs/common';
// import { UserRepository } from '../../auth/user.repository';
// import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';
// import { PermissionLevel } from '../../auth/permission-level.enum';

// @Injectable()
// export class Seeder {
//   constructor(
//     private readonly logger: Logger,
//     private readonly userRepository: UserRepository,
//   ) {}

//   async seed() {
//     this.logger.log('Start seeding...');
//     // const dto = new GetMasterDataFilterDto();
//     // const profiles = await this.profilesService.getProfiles(dto);
//     // console.log('Profiles:', profiles);

//     const hasUsers = await this.userRepository.hasUsers();
//     if (hasUsers) {
//       // Make sure, the admin user is set up with the right permission level
//       const admin = await this.userRepository.getAdminUser();
//       if (admin.permissionLevel !== PermissionLevel.ADMIN) {
//         this.logger.log(
//           'Admin user is not set to PermissionLevel.ADMIN. Fixing...',
//         );
//         admin.permissionLevel = PermissionLevel.ADMIN;
//         await admin.save();
//       }
//     } else {
//       this.logger.log(
//         'No users existing. Create initial admin user with default credentials...',
//       );
//       const credentials = new AuthCredentialsDto();
//       credentials.username = 'admin';
//       credentials.password = 'admin1234';
//       credentials.permissionLevel = PermissionLevel.ADMIN;

//       await this.userRepository.signUp(credentials);
//     }
//   }
// }
