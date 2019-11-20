import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { LocationDto } from './dto/location.dto';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getCoordinatesByAddress, Coordinates } from '../helpers/utils';


@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationsRepository)
    private repository: LocationsRepository,
  ) {}

  getLocationById = async (id: number): Promise<Location> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Location with ID ${id} not found`);
    return entity;
  };

  createLocation = async (dto: LocationDto, latitude: number = null, longitude: number = null): Promise<Location> => {
    let geodata: Coordinates;
    if (latitude && longitude) {
      geodata = {
        lat: latitude,
        lng: longitude
      };
    } else {
      geodata = await getCoordinatesByAddress(dto.address, dto.zip, dto.city);
    }
    return this.repository.createLocation(dto, geodata.lat, geodata.lng);
  }

  updateLocation = async (
    id: number,
    dto: LocationDto,
  ): Promise<Location> => {
    const entity = await this.getLocationById(id);
    entity.address = dto.address;
    entity.city = dto.city;
    entity.zip = dto.zip;

    if (entity.address !== dto.address || entity.city !== dto.city || entity.zip !== dto.zip) {
      const geodata = await getCoordinatesByAddress(dto.address, dto.zip, dto.city);
      entity.latitude = geodata.lat;
      entity.longitude = geodata.lng;
    }

    
    return entity.save();
  };

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
