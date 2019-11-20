import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CampgroundsRepository } from './campgrounds.repository';
import { CampgroundDto } from './dto/campground.dto';
import { Campground } from './campground.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class CampgroundsService {
  constructor(
    @InjectRepository(CampgroundsRepository)
    private repository: CampgroundsRepository,
    private locationsService: LocationsService,
  ) {}

  getCampgroundById = async (id: number): Promise<Campground> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`Campground with ID ${id} not found`);
    return entity;
  };

  createCampground = async (dto: CampgroundDto): Promise<Campground> => {
    const entity = new Campground();
    entity.name = dto.name;
    entity.description = dto.description;

    if (dto.locationID) {
      entity.location = await this.locationsService.getLocationById(dto.locationID);
    } else {
      entity.location = await this.locationsService.createLocation({
        city: dto.city,
        zip: dto.zip,
        address: dto.address,
      }, dto.latitude, dto.longitude);
    }
    return await entity.save();
  }

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
    entity.location.latitude = dto.latitude;
    entity.location.longitude = dto.longitude;
    return await entity.save();
  };

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
