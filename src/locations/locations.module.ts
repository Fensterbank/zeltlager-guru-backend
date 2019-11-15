import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsRepository } from './locations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { passportModule } from '../passport.module';

@Module({
  imports: [
    passportModule,
    TypeOrmModule.forFeature([LocationsRepository]),
    AuthModule,
  ],
  controllers: [],
  providers: [LocationsService],
})
export class LocationsModule {}
