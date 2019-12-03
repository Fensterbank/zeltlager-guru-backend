import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CampsRepository } from './camps.repository';
import { CampDto } from './dto/camp.dto';
import { Camp } from './camp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from '../search.dto';
import { OrganisationsService } from '../organisations/organisations.service';
import { Logger } from 'winston';
import { PicturesService } from '../pictures/pictures.service';

@Injectable()
export class CampsService {
  constructor(
    @InjectRepository(CampsRepository)
    private repository: CampsRepository,
    private orgService: OrganisationsService,
    private picturesService: PicturesService,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  /**
   * Gets all camps based on given filter.
   * @param {SearchDto} filterDto - The filter to retreive camps.
   */
  getCamps = async (filterDto: SearchDto): Promise<Camp[]> =>
    this.repository.getCamps(filterDto);

  /**
   * Gets a specific camp.
   * @param {number} id - The id of the camp.
   */
  getCampById = async (id: number): Promise<Camp> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Camp with ID ${id} not found`);
    return entity;
  };

  /**
   * Creates a new camp.
   * @param {CampDto} dto - The data transport object containing all entity information.
   */
  createCamp = async (dto: CampDto): Promise<Camp> => {
    const entity = new Camp();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;
    entity.minAge = dto.minAge;
    entity.maxAge = dto.maxAge;

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    entity.organisation = await this.orgService.getOrganisationById(dto.organisationID);
    await entity.save();
    this.logger.info(`Camp ${entity.name} with ID #${entity.id} created.`);
    return entity;
  }

  /**
   * Updates an existing camp.
   * @param {number} id - The id of the camp to update.
   * @param {CampDto} dto - The data transport object containing all entity information.
   */
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

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    await entity.save();
    this.logger.info(`Camp ${entity.name} with ID #${entity.id} updated.`);
    return entity;
  };

  /**
   * Deletes an existing camp.
   * @param {number} id - The id of the camp to delete.
   */
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
    else
      this.logger.info(`Camp with ID #${id} deleted.`);
  };
}
