import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { Camp } from './camp.entity';
import { SearchDto } from '../search.dto';

@EntityRepository(Camp)
export class CampsRepository extends Repository<Camp> {
  private logger = new Logger('CampsRepository');

  getCamps = async (
    filterDto: SearchDto,
  ): Promise<Camp[]> => {
    const { search } = filterDto;
    const query = this.createQueryBuilder('camps');
    if (search)
      query.where('camps.name ILIKE :search', { search: `${search}%` });

    query.orderBy('name', 'ASC');
    return await query.getMany();
  };
}
