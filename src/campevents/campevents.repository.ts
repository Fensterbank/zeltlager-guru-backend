import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { CampEvent } from './campevent.entity';
import { SearchDto } from '../search.dto';

@EntityRepository(CampEvent)
export class CampEventsRepository extends Repository<CampEvent> {
  private logger = new Logger('CampEventsRepository');

  getCampEvents = async (
    filterDto: SearchDto,
  ): Promise<CampEvent[]> => {
    const { search } = filterDto;
    const query = this.createQueryBuilder('campevents');
    if (search)
      query.where('campevents.name ILIKE :search', { search: `${search}%` });

    query.orderBy('name', 'ASC');
    return await query.getMany();
  };
}
