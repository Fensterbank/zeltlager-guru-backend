import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Campground } from '../campground/campground.entity';
import { Organisation } from '../organisations/organisation.entity';

@Entity()
@ObjectType()
export class Location extends BaseEntity {
  constructor() {
    super();
  }

  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  zip: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  address: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column({ type: 'decimal' })
  lat: number;

  @Field()
  @Column({ type: 'decimal' })
  lng: number;

  @OneToMany(type => Campground, x => x.location, { eager: false, nullable: true })
  campgrounds: Campground[];

  @Field(type => [Organisation])
  @OneToMany(type => Organisation, x => x.location, { eager: false, nullable: true })
  organisations: Organisation[];
}
