import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { LocationsRepository } from './locations.repository';
import { LocationDto } from './dto/location.dto';
import { Location } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  createLocation = async (dto: LocationDto): Promise<Location> =>
    this.repository.createLocation(dto);

  updateLocation = async (
    id: number,
    dto: LocationDto,
  ): Promise<Location> => {
    const entity = await this.getLocationById(id);
    entity.city = dto.city;
    entity.latitude = dto.latitude;
    entity.longitude = dto.longitude;
    entity.zip = dto.zip;
    return await entity.save();
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
