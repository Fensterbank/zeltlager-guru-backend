import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CampsRepository } from './camps.repository';
import { CampDto } from './dto/camp.dto';
import { Camp } from './camp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from '../search.dto';
import { OrganisationsService } from '../organisations/organisations.service';

@Injectable()
export class CampsService {
  constructor(
    @InjectRepository(CampsRepository)
    private repository: CampsRepository,
    private orgService: OrganisationsService,
  ) {}


  getCamps = async (filterDto: SearchDto,
  ): Promise<Camp[]> =>
    this.repository.getCamps(filterDto);


  getCampById = async (id: number): Promise<Camp> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Camp with ID ${id} not found`);
    return entity;
  };

  createCamp = async (dto: CampDto): Promise<Camp> => {
    const entity = new Camp();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;
    entity.minAge = dto.minAge;
    entity.maxAge = dto.maxAge;

    entity.organisation = await this.orgService.getOrganisationById(dto.organisationID);
    return await entity.save();
  }

  updateCamp = async (
    id: number,
    dto: CampDto,
  ): Promise<Camp> => {
    const entity = await this.getCampById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;
    entity.minAge = dto.minAge;
    entity.maxAge = dto.maxAge;
    return await entity.save();
  };

  deleteCamp = async (id: number): Promise<void> => {
    let result;
    try {
      result = await this.repository.delete(id);
    } catch (error) {
      if (error.code === '23503')
        // Foreign key constraint
        throw new ConflictException(
          'Conflict exception...',
        );

      throw error;
    }

    if (result.affected === 0)
      throw new NotFoundException(`Camp with ID ${id} not found`);
  };
}
