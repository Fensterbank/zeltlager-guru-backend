import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CampgroundsRepository } from './campgrounds.repository';
import { CampgroundDto } from './dto/campground.dto';
import { Campground } from './campground.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';
import { Logger } from 'winston';
import { SearchDto } from '../search.dto';
import { PicturesService } from '../pictures/pictures.service';

@Injectable()
export class CampgroundsService {
  constructor(
    @InjectRepository(CampgroundsRepository)
    private repository: CampgroundsRepository,
    private locationsService: LocationsService,
    private picturesService: PicturesService,
    @Inject('winston')
    private readonly logger: Logger,
  ) { }

  /**
   * Gets a specific campground.
   * @param {number} id - The id of the campgorund.
   */
  getCampgroundById = async (id: number): Promise<Campground> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Campground with ID ${id} not found`);
    return entity;
  };

  /**
   * Gets all organisations based on given filter.
   * @param {SearchDto} filterDto - The filter to retreive organisations.
   */
  getCampgrounds = async (filterDto: SearchDto): Promise<Campground[]> =>
    this.repository.getCampgrounds(filterDto);


  /**
  * Creates a new campground. Does create a new location entity if necessary.
  * @param {CampgroundDto} dto - The data transport object containing all entity information.
  */
  createCampground = async (dto: CampgroundDto): Promise<Campground> => {
    const entity = new Campground();
    entity.name = dto.name;
    entity.description = dto.description;

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    if (dto.locationID) {
      entity.location = await this.locationsService.getLocationById(dto.locationID);
    } else {
      entity.location = await this.locationsService.createLocation({
        city: dto.city,
        zip: dto.zip,
        address: dto.address,
      }, dto.lat, dto.lng);
    }
    await entity.save();
    this.logger.info(`Campground ${entity.name} with ID #${entity.id} created.`);
    return entity;
  }

  /**
   * Updates an existing campground and the referenced location.
   * @param {number} id - The id of the campground to update.
   * @param {CampgroundDto} dto - The data transport object containing all entity information.
   */
  updateCampground = async (
    id: number,
    dto: CampgroundDto,
  ): Promise<Campground> => {
    const entity = await this.getCampgroundById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.location.city = dto.city;
    entity.location.zip = dto.zip;
    entity.location.address = dto.address;
    entity.location.lat = dto.lat;
    entity.location.lng = dto.lng;

    const picture = await this.picturesService.getPictureById(dto.pictureID);
    entity.picture = picture;

    await entity.save();
    this.logger.info(`Campground ${entity.name} with ID #${entity.id} updated.`);
    return entity;
  };

  /**
   * Deletes an existing campground.
   * @param {number} id - The id of the campground to delete.
   */
  deleteCampground = async (id: number): Promise<void> => {
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
      throw new NotFoundException(`Campground with ID ${id} not found`);
  };
}
