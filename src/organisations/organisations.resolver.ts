import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Organisation } from './organisation.entity';
import { OrganisationsService } from './organisations.service';
import { SearchDto } from '../search.dto';
import { ParseIntPipe } from '@nestjs/common';
import { OrganisationDto } from './dto/organisation.dto';

@Resolver(of => Organisation)
export class OrganisationsResolver {
  constructor(private readonly service: OrganisationsService) { }

  @Query(returns => Organisation)
  organisation(@Args('id', ParseIntPipe) id: number): Promise<Organisation> {
    return this.service.getOrganisationById(id);
  }

  @Query(returns => [Organisation])
  organisations(@Args() search: SearchDto): Promise<Organisation[]> {
    return this.service.getOrganisations(search);
  }

  @Mutation(returns => Organisation)
  createOrganisation(@Args('data') data: OrganisationDto): Promise<Organisation> {
    return this.service.createOrganisation(data);
  }

  @Mutation(returns => Organisation)
  updateOrganisation(@Args('id', ParseIntPipe) id: number, @Args('data') data: OrganisationDto): Promise<Organisation> {
    return this.service.updateOrganisation(id, data);
  }

  @Mutation(returns => Boolean)
  deleteOrganisation(@Args('id', ParseIntPipe) id: number) {
    return this.service.deleteOrganisation(id);
  }
}