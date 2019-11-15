import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { OrganisationsRepository } from './organisations.repository';
import { OrganisationDto } from './dto/organisation.dto';
import { Organisation } from './organisation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';
import { SearchDto } from 'src/search.dto';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(OrganisationsRepository)
    private repository: OrganisationsRepository,
    private locationsService: LocationsService,
  ) {}


  getOrganisations = async (filterDto: SearchDto,
  ): Promise<Organisation[]> =>
    this.repository.getOrganisations(filterDto);


  getOrganisationById = async (id: number): Promise<Organisation> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Organisation with ID ${id} not found`);
    return entity;
  };

  createOrganisation = async (dto: OrganisationDto): Promise<Organisation> => {
    const entity = new Organisation();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.religion = dto.religion;

    if (dto.locationID) {
      entity.location = await this.locationsService.getLocationById(dto.locationID);
    } else {
      entity.location = await this.locationsService.createLocation({
        city: dto.city,
        zip: dto.zip,
        address: dto.address,
        latitude: dto.latitude,
        longitude: dto.longitude,
      });
    }
    return await entity.save();
  }

  updateOrganisation = async (
    id: number,
    dto: OrganisationDto,
  ): Promise<Organisation> => {
    const entity = await this.getOrganisationById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.location.city = dto.city;
    entity.location.zip = dto.zip;
    entity.location.address = dto.address;
    entity.location.latitude = dto.latitude;
    entity.location.longitude = dto.longitude;
    return await entity.save();
  };

  deleteOrganisation = async (id: number): Promise<void> => {
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
      throw new NotFoundException(`Organisation with ID ${id} not found`);
  };
}
