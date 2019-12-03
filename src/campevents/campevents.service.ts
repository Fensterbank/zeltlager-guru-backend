import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CampEventsRepository } from './campevents.repository';
import { CampEventDto } from './dto/campevent.dto';
import { CampEvent } from './campevent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from '../search.dto';
import { CampsService } from '../camps/camps.service';
import { CampgroundsService } from '../campground/campgrounds.service';
import { Logger } from 'winston';
import { PicturesService } from '../pictures/pictures.service';

@Injectable()
export class CampEventsService {
  constructor(
    @InjectRepository(CampEventsRepository)
    private repository: CampEventsRepository,
    private campService: CampsService,
    private campgroundService: CampgroundsService,
    private picturesService: PicturesService,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  /**
   * Gets all camp events based on given filter.
   * @param {SearchDto} filterDto - The filter to retreive camp events.
   */
  getCampEvents = async (filterDto: SearchDto): Promise<CampEvent[]> =>
    this.repository.getCampEvents(filterDto);


  /**
   * Gets a specific camp event.
   * @param {number} id - The id of the camp event.
   */
  getCampEventById = async (id: number): Promise<CampEvent> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`CampEvent with ID ${id} not found`);
    return entity;
  };

  /**
   * Creates a camp event. Does create a new campground if necessary.
   * @param {CampEventDto} dto - The data transport object containing all entity information.
   */
  createCampEvent = async (dto: CampEventDto): Promise<CampEvent> => {
    const entity = new CampEvent();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.motto = dto.motto;
    entity.begin = dto.begin;
    entity.end = dto.end;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    entity.camp = await this.campService.getCampById(dto.campID);

    if (dto.campgroundID) {
      entity.campground = await this.campgroundService.getCampgroundById(dto.campgroundID);
    } else if (dto.campground) {
      entity.campground = await this.campgroundService.createCampground(dto.campground);
    } else {
      throw new BadRequestException('Campground is missing!');
    }

    await entity.save();
    this.logger.info(`Camp event ${entity.name} with ID #${entity.id} created.`);
    return entity;
  }

  /**
   * Updates an existing camp event.
   * @param {number} id - The id of the camp event to update.
   * @param {CampEventDto} dto - The data transport object containing all entity information.
   */
  updateCampEvent = async (
    id: number,
    dto: CampEventDto,
  ): Promise<CampEvent> => {
    const entity = await this.getCampEventById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.url = dto.url;
    entity.motto = dto.motto;
    entity.begin = dto.begin;
    entity.end = dto.end;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    // TODO: Maybe we need to update the campground too...
    await entity.save();
    this.logger.info(`Camp event ${entity.name} with ID #${entity.id} updated.`);
    return entity;
  };

  /**
   * Deletes an existing camp event.
   * @param {number} id - The id of the camp event to delete.
   */
  deleteCampEvent = async (id: number): Promise<void> => {
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
      throw new NotFoundException(`CampEvent with ID ${id} not found`);
    else
      this.logger.info(`Camp event with ID #${id} deleted.`);
  };
}
