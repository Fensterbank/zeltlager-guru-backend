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
import { CampsService } from './camps.service';
import { CampDto } from './dto/camp.dto';
import { Camp } from './camp.entity';
import { SearchDto } from '../search.dto';

@Controller('camps')
export class CampsController {
  constructor(private service: CampsService) {}

  @Get()
  getCamps(
    @Query(ValidationPipe) filterDto: SearchDto,
  ): Promise<Camp[]> {
    return this.service.getCamps(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCamp(@Body() dto: CampDto): Promise<Camp> {
    return this.service.createCamp(dto);
  }

  @Delete('/:id')
  deleteCamp(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteCamp(id);
  }

  @Patch('/:id')
  updateCamp(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CampDto,
  ): Promise<Camp> {
    return this.service.updateCamp(id, dto);
  }
}
