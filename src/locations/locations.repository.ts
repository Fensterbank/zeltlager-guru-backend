import { EntityRepository, Repository } from 'typeorm';
import { LocationDto } from './dto/location.dto';
import {
  Logger,
} from '@nestjs/common';
import { Location } from './location.entity';

@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {
  private logger = new Logger('LocationRepository');

  createLocation = async (dto: LocationDto, latitude: number, longitude: number) => {
    const entity = new Location();
    entity.address = dto.address;
    entity.city = dto.city;
    entity.latitude = latitude;
    entity.longitude = longitude;
    entity.zip = dto.zip;

    try {
      await entity.save();
    } catch (error) {
        this.logger.error(
          `Failed to create location: ${error.message}`,
          error.stack,
        );
    }

    return entity;
  };
}
