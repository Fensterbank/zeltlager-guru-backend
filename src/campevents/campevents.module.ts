import { Module } from '@nestjs/common';
import { CampEventsService } from './campevents.service';
import { CampEventsRepository } from './campevents.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';
import { CampgroundsRepository } from '../campground/campgrounds.repository';
import { CampsService } from '../camps/camps.service';
import { CampgroundsService } from '../campground/campgrounds.service';
import { CampsRepository } from '../camps/camps.repository';
import { OrganisationsService } from '../organisations/organisations.service';
import { OrganisationsRepository } from '../organisations/organisations.repository';
import { LocationsService } from '../locations/locations.service';
import { LocationsRepository } from '../locations/locations.repository';
import { CampEventsController } from './campevents.controller';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      CampEventsRepository,
      LocationsRepository,
      OrganisationsRepository,
      CampsRepository,
      CampgroundsRepository,
    ]),
    AuthModule,
  ],
  controllers: [CampEventsController],
  providers: [
    CampEventsService,
    LocationsService,
    OrganisationsService,
    CampsService,
    CampgroundsService
  ],
})
export class CampEventsModule {}
