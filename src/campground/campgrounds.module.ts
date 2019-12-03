import { Module } from '@nestjs/common';
import { CampgroundsService } from './campgrounds.service';
import { CampgroundsRepository } from './campgrounds.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';
import { LocationsRepository } from '../locations/locations.repository';
import { LocationsService } from '../locations/locations.service';
import { CampgroundsResolver } from './campgrounds.resolver';
import { PicturesRepository } from '../pictures/pictures.repository';
import { PicturesService } from '../pictures/pictures.service';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      CampgroundsRepository,
      LocationsRepository,
      PicturesRepository,
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [
    CampgroundsResolver,
    CampgroundsService,
    LocationsService,
    PicturesService,
  ],
})
export class CampgroundsModule {}
