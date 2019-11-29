import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SearchDto } from '../search.dto';
import { ParseIntPipe } from '@nestjs/common';
import { Campground } from './campground.entity';
import { CampgroundsService } from './campgrounds.service';
import { CampgroundDto } from './dto/campground.dto';

@Resolver(of => Campground)
export class CampgroundsResolver {
  constructor(private readonly service: CampgroundsService) { }

  @Query(returns => Campground)
  campground(@Args('id', ParseIntPipe) id: number): Promise<Campground> {
    return this.service.getCampgroundById(id);
  }

  @Query(returns => [Campground])
  campgrounds(@Args() search: SearchDto): Promise<Campground[]> {
    return this.service.getCampgrounds(search);
  }

  @Mutation(returns => Campground)
  createCampground(@Args('data') data: CampgroundDto): Promise<Campground> {
    return this.service.createCampground(data);
  }

  @Mutation(returns => Campground)
  updateCampground(@Args('id', ParseIntPipe) id: number, @Args('data') data: CampgroundDto): Promise<Campground> {
    return this.service.updateCampground(id, data);
  }

  @Mutation(returns => Boolean)
  deleteCampground(@Args('id', ParseIntPipe) id: number) {
    return this.service.deleteCampground(id);
  }
}