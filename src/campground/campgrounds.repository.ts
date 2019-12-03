import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { Campground } from './campground.entity';
import { SearchDto } from '../search.dto';

@EntityRepository(Campground)
export class CampgroundsRepository extends Repository<Campground> {
  private logger = new Logger('LocationRepository');

  getCampgrounds = async (
    filterDto: SearchDto,
  ): Promise<Campground[]> => {
    const { search } = filterDto;
    const query = this.createQueryBuilder('campgrounds')
      .leftJoinAndSelect('campgrounds.location', 'location')
      .leftJoinAndSelect('campgrounds.picture', 'picture');
      
    if (search)
      query.where('campgrounds.name ILIKE :search', { search: `%${search}%` });

    query.orderBy('name', 'ASC');
    return await query.getMany();
  };
}
