import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeOrmConfig = require('./config/typeorm.config');
import { AuthModule } from './auth/auth.module';
import { LocationsModule } from './locations/locations.module';
import { CampgroundsModule } from './campground/campgrounds.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { CampsModule } from './camps/camps.module';
import { CampEventsModule } from './campevents/campevents.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    AuthModule,
    LocationsModule,
    CampgroundsModule,
    OrganisationsModule,
    CampsModule,
    CampEventsModule,
  ],
})
export class AppModule {}
