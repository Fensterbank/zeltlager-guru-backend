import { Module } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { OrganisationsRepository } from './organisations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';
import { LocationsRepository } from '../locations/locations.repository';
import { LocationsService } from '../locations/locations.service';
import { OrganisationsResolver } from './organisations.resolver';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([
      OrganisationsRepository,
      LocationsRepository,
    ]),
    AuthModule,
  ],
  controllers: [],
  providers: [
    OrganisationsResolver,
    OrganisationsService,
    LocationsService,
  ],
})
export class OrganisationsModule {}
