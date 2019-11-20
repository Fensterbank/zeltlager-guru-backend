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
import { OrganisationsService } from './organisations.service';
import { OrganisationDto } from './dto/organisation.dto';
import { Organisation } from './organisation.entity';
import { SearchDto } from '../search.dto';

@Controller('orgs')
export class OrganisationsController {
  constructor(private service: OrganisationsService) {}

  @Get()
  getOrganisations(
    @Query(ValidationPipe) filterDto: SearchDto,
  ): Promise<Organisation[]> {
    return this.service.getOrganisations(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOrganisation(@Body() dto: OrganisationDto): Promise<Organisation> {
    return this.service.createOrganisation(dto);
  }

  @Delete('/:id')
  deleteOrganisation(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.deleteOrganisation(id);
  }

  @Patch('/:id')
  updateOrganisation(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OrganisationDto,
  ): Promise<Organisation> {
    return this.service.updateOrganisation(id, dto);
  }
}
