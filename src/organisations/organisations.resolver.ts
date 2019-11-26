import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Organisation } from './organisation.entity';
import { OrganisationsService } from './organisations.service';

@Resolver(of => Organisation)
export class OrganisationsResolver {
  constructor(private readonly service: OrganisationsService) {}

  @Query(returns => String)
  async hello(): Promise<String> {
    return "Hello World";
  }

  @Query(returns => Organisation)
  async organisation(@Args('id') id: number): Promise<Organisation> {
    return this.service.getOrganisationById(id);
  }
}