import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { Organisation } from './organisation.entity';
import { SearchDto } from '../search.dto';

@EntityRepository(Organisation)
export class OrganisationsRepository extends Repository<Organisation> {
  private logger = new Logger('OrganisationsRepository');

  getOrganisations = async (
    filterDto: SearchDto,
  ): Promise<Organisation[]> => {
    const { search } = filterDto;
    const query = this.createQueryBuilder('organisations').leftJoinAndSelect('organisations.location', 'location')
    if (search)
      query.where('organisations.name ILIKE :search', { search: `%${search}%` });

    query.orderBy('name', 'ASC');
    return await query.getMany();
  };
}
