// import { Module, Logger } from '@nestjs/common';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import typeOrmConfig = require('../../config/typeorm.config');
// import { Seeder } from './seeder';
// import { ProfilesRepository } from '../../profiles/profiles.repository';
// import { ProfilesService } from '../../profiles/profiles.service';
// import { UserRepository } from '../../auth/user.repository';
// import { AuthService } from '../../auth/auth.service';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import * as config from 'config';

// const jwtConfig = config.get('jwt');

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: process.env.JWT_SECRET || jwtConfig.secret,
//       signOptions: {
//         expiresIn: jwtConfig.expiresIn,
//       },
//     }),
//     TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
//     TypeOrmModule.forFeature([ProfilesRepository, UserRepository]),
//   ],
//   providers: [ProfilesService, AuthService, Logger, Seeder],
// })
// export class SeederModule {}
