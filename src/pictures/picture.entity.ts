import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Campground } from '../campground/campground.entity';
import { Organisation } from '../organisations/organisation.entity';
import { Camp } from '../camps/camp.entity';
import { CampEvent } from '../campevents/campevent.entity';

@ObjectType()
@Entity()
export class Picture extends BaseEntity {
  constructor() {
    super();
  }

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  filename: string;

  @OneToMany(type => Organisation, x => x.picture, { eager: false, nullable: true })
  organisations: Organisation[];

  @OneToMany(type => Camp, x => x.picture, { eager: false, nullable: true })
  camps: Camp[];

  @OneToMany(type => CampEvent, x => x.picture, { eager: false, nullable: true })
  campEvents: CampEvent[];

  @OneToMany(type => Campground, x => x.picture, { eager: false, nullable: true })
  campgrounds: Campground[];
}
