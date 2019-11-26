import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { LocationDto } from './dto/location.dto';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getCoordinatesByAddress, Coordinates } from '../helpers/utils';
import { Logger } from 'winston';


@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationsRepository)
    private repository: LocationsRepository,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  /**
   * Gets a specific location.
   * @param {number} id - The id of the location.
   */
  getLocationById = async (id: number): Promise<Location> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Location with ID ${id} not found`);
    return entity;
  };

   /**
   * Creates a new location. If coordinates are not provided, a geocoding service will be used to retrieve coordinates.
   * @param {LocationDto} dto - The data transport object containing all entity information.
   * @param {number} lat - The latitude. If provided together wit lng, it will used instead of a geocoding service.
   * @param {number} lng - The longitude. If provided together wit lat, it will used instead of a geocoding service.
   */
  createLocation = async (dto: LocationDto, lat: number = null, lng: number = null): Promise<Location> => {
    let geodata: Coordinates;
    if (lat && lng) {
      geodata = {
        lat: lat,
        lng: lng
      };
    } else {
      geodata = await getCoordinatesByAddress(dto.address, dto.zip, dto.city);
    }
    const entity = await this.repository.createLocation(dto, geodata.lat, geodata.lng);
    this.logger.info(`Location ${entity.toString()} with ID #${entity.id} created.`);
    return entity;
  }

  /**
   * Updates a location. If address, zip or citiy are changed,a geocoding service wil be used to retrieve coordinates.
   * @param {number} id - The id of the location to update.
   * @param {LocationDto} dto - The data transport object containing all entity information.
   */
  updateLocation = async (
    id: number,
    dto: LocationDto,
  ): Promise<Location> => {
    const entity = await this.getLocationById(id);
    if (entity.address !== dto.address || entity.city !== dto.city || entity.zip !== dto.zip) {
      const geodata = await getCoordinatesByAddress(dto.address, dto.zip, dto.city);
      entity.lat = geodata.lat;
      entity.lng = geodata.lng;
    }

    entity.address = dto.address;
    entity.city = dto.city;
    entity.zip = dto.zip;
    
    await entity.save();
    this.logger.info(`Location ${entity.toString()} with ID #${entity.id} updated.`);
    return entity;
  };

  /**
   * Deletes an existing location.
   * @param {number} id - The id of the location to delete.
   */
  deleteLocation = async (id: number): Promise<void> => {
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
      throw new NotFoundException(`Location with ID ${id} not found`);
  };
}
