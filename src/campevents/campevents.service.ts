import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { CampEventsRepository } from './campevents.repository';
import { CampEventDto } from './dto/campevent.dto';
import { CampEvent } from './campevent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from '../search.dto';
import { CampsService } from '../camps/camps.service';
import { CampgroundsService } from '../campground/campgrounds.service';

@Injectable()
export class CampEventsService {
  constructor(
    @InjectRepository(CampEventsRepository)
    private repository: CampEventsRepository,
    private campService: CampsService,
    private campgroundService: CampgroundsService,
  ) {}


  getCampEvents = async (filterDto: SearchDto,
  ): Promise<CampEvent[]> =>
    this.repository.getCampEvents(filterDto);


  getCampEventById = async (id: number): Promise<CampEvent> => {
    const entity = await this.repository.findOne(id);

    if (!entity)
      throw new NotFoundException(`CampEvent with ID ${id} not found`);
    return entity;
  };

  createCampEvent = async (dto: CampEventDto): Promise<CampEvent> => {
    const entity = new CampEvent();
    entity.name = dto.name;
    entity.description = dto.description;
    entity.motto = dto.motto;
    entity.begin = dto.begin;
    entity.end = dto.end;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;

    entity.camp = await this.campService.getCampById(dto.campID);

    if (dto.campgroundID) {
      entity.campground = await this.campgroundService.getCampgroundById(dto.campgroundID);
    } else if (dto.campground) {
      entity.campground = await this.campgroundService.createCampground(dto.campground);
    } else {
      throw new BadRequestException('Campground is missing!');
    }

    return await entity.save();
  }

  updateCampEvent = async (
    id: number,
    dto: CampEventDto,
  ): Promise<CampEvent> => {
    const entity = await this.getCampEventById(id);
    entity.name = dto.name;
    entity.description = dto.description;
    entity.motto = dto.motto;
    entity.begin = dto.begin;
    entity.end = dto.end;
    entity.teamCount = dto.teamCount;
    entity.kidsCount = dto.kidsCount;

    // TODO: What about modifiying the campground?
    return await entity.save();
  };

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
  };
}
