import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { CampEventsService } from './campevents.service';
import { CampEventDto } from './dto/campevent.dto';
import { CampEvent } from './campevent.entity';
import { SearchDto } from '../search.dto';

@Controller('orgs')
export class CampEventsController {
  constructor(private service: CampEventsService) {}

  @Get()
  getCampEvents(
    @Query(ValidationPipe) filterDto: SearchDto,
  ): Promise<CampEvent[]> {
    return this.service.getCampEvents(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCampEvent(@Body() dto: CampEventDto): Promise<CampEvent> {
    return this.service.createCampEvent(dto);
  }

  @Delete('/:id')
  deleteCampEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteCampEvent(id);
  }

  @Patch('/:id')
  updateCampEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CampEventDto,
  ): Promise<CampEvent> {
    return this.service.updateCampEvent(id, dto);
  }
}
