import { Module } from '@nestjs/common';
import { CampsService } from './camps.service';
import { CampsRepository } from './camps.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';
import { OrganisationsRepository } from '../organisations/organisations.repository';
import { OrganisationsService } from '../organisations/organisations.service';
import { LocationsRepository } from '../locations/locations.repository';
import { LocationsService } from '../locations/locations.service';
import { CampsController } from './camps.controller';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      CampsRepository,
      LocationsRepository,
      OrganisationsRepository,
    ]),
    AuthModule,
  ],
  controllers: [CampsController],
  providers: [
    CampsService,
    LocationsService,
    OrganisationsService,
  ],
})
export class CampsModule {}
