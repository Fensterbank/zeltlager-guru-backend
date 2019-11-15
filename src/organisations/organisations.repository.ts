import { EntityRepository, Repository } from 'typeorm';
import {
  Logger,
} from '@nestjs/common';
import { Organisation } from './organisation.entity';

@EntityRepository(Organisation)
export class OrganisationsRepository extends Repository<Organisation> {
  private logger = new Logger('OrganisationsRepository');

}
