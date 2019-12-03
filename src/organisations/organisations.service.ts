import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { OrganisationsRepository } from './organisations.repository';
import { OrganisationDto } from './dto/organisation.dto';
import { Organisation } from './organisation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';
import { SearchDto } from '../search.dto';
import { Logger } from 'winston';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(OrganisationsRepository)
    private repository: OrganisationsRepository,
    private locationsService: LocationsService,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  /**
   * Gets all organisations based on given filter.
   * @param {SearchDto} filterDto - The filter to retreive organisations.
   */
  getOrganisations = async (filterDto: SearchDto): Promise<Organisation[]> =>
    this.repository.getOrganisations(filterDto);

  /**
   * Gets a specific organisation.
   * @param {number} id - The id of the organisation.
   */
  getOrganisationById = async (id: number): Promise<Organisation> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Organisation with ID ${id} not found`);
    return entity;
  };

  /**
   * Creates a new organisation. Does create a new location entity if necessary.
   * @param {OrganisationDto} dto - The data transport object containing all entity information.
   */
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
      });
    }
    await entity.save();
    this.logger.info(`Organisation ${entity.name} with ID #${entity.id} created.`);
    return entity;
  }

  /**
   * Updates an existing organisation and the referenced location.
   * @param {number} id - The id of the organisation to update.
   * @param {OrganisationDto} dto - The data transport object containing all entity information.
   */
  updateOrganisation = async (
    id: number,
    dto: OrganisationDto,
  ): Promise<Organisation> => {
    const entity = await this.getOrganisationById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.religion = dto.religion;

    entity.location = await this.locationsService.updateLocation(entity.location.id, {
      address: dto.address,
      zip: dto.zip,
      city: dto.city,
    });
    await entity.save();
    this.logger.info(`Organisation ${entity.name} with ID #${entity.id} updated.`);
    return entity;
  };

  /**
   * Deletes an existing organisation.
   * @param {number} id - The id of the organisation to delete.
   */
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
    else
      this.logger.info(`Organisation with ID #${id} deleted.`);
  };
}
