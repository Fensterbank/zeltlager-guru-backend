import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchDto } from '../search.dto';
import { Camp } from './camp.entity';
import { CampsService } from './camps.service';
import { ParseIntPipe } from '@nestjs/common';
import { CampDto } from './dto/camp.dto';
import { Int } from 'type-graphql';

@Resolver(of => Camp)
export class CampsResolver {
  constructor(private readonly service: CampsService) {}

  @Query(returns => Camp)
  camp(@Args({ name: 'id', type: () => Int }, ParseIntPipe) id: number): Promise<Camp> {
    return this.service.getCampById(id);
  }

  @Query(returns => [Camp])
  camps(@Args() search: SearchDto): Promise<Camp[]> {
    return this.service.getCamps(search);
  }

  @Mutation(returns => Camp)
  createCamp(@Args('data') data: CampDto): Promise<Camp> {
    return this.service.createCamp(data);
  }

  @Mutation(returns => Camp)
  updateCamp(@Args({ name: 'id', type: () => Int }, ParseIntPipe) id: number, @Args('data') data: CampDto): Promise<Camp> {
    return this.service.updateCamp(id, data);
  }

  @Mutation(returns => Boolean)
  deleteCamp(@Args({ name: 'id', type: () => Int }, ParseIntPipe) id: number) {
    return this.service.deleteCamp(id);
  }
}