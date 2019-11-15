import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { Campground } from './campground.entity';

@EntityRepository(Campground)
export class CampgroundsRepository extends Repository<Campground> {
  private logger = new Logger('LocationRepository');

}
