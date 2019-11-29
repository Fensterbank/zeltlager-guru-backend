import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchDto } from '../search.dto';
import { CampEvent } from './campevent.entity';
import { CampEventsService } from './campevents.service';
import { ParseIntPipe } from '@nestjs/common';
import { CampEventDto } from './dto/campevent.dto';

@Resolver(of => CampEvent)
export class CampEventsResolver {
  constructor(private readonly service: CampEventsService) {}

  @Query(returns => CampEvent)
  campevent(@Args('id', ParseIntPipe) id: number): Promise<CampEvent> {
    return this.service.getCampEventById(id);
  }

  @Query(returns => [CampEvent])
  campevents(@Args() search: SearchDto): Promise<CampEvent[]> {
    return this.service.getCampEvents(search);
  }

  @Mutation(returns => CampEvent)
  createCampEvent(@Args('data') data: CampEventDto): Promise<CampEvent> {
    return this.service.createCampEvent(data);
  }

  @Mutation(returns => CampEvent)
  updateCampEvent(@Args('id', ParseIntPipe) id: number, @Args('data') data: CampEventDto): Promise<CampEvent> {
    return this.service.updateCampEvent(id, data);
  }

  @Mutation(returns => Boolean)
  deleteCampEvent(@Args('id', ParseIntPipe) id: number) {
    return this.service.deleteCampEvent(id);
  }
}