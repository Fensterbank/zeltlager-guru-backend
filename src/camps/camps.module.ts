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
import { CampsResolver } from './camps.resolver';
import { PicturesRepository } from '../pictures/pictures.repository';
import { PicturesService } from '../pictures/pictures.service';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      CampsRepository,
      LocationsRepository,
      OrganisationsRepository,
      PicturesRepository,
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [
    CampsResolver,
    CampsService,
    LocationsService,
    OrganisationsService,
    PicturesService,
  ],
})
export class CampsModule {}
