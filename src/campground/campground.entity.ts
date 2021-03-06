import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Location } from '../locations/location.entity';
import { CampEvent } from '../campevents/campevent.entity';
import { Picture } from '../pictures/picture.entity';

@ObjectType()
@Entity()
export class Campground extends BaseEntity {
  constructor() {
    super();
  }

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field(type => Location)
  @ManyToOne(type => Location, x => x.campgrounds, { eager: true })
  location: Location;

  @Field(type => [CampEvent])
  @OneToMany(type => CampEvent, x => x.campground, { eager: false, nullable: false })
  campevents: CampEvent[];

  @Field(type => Picture, { nullable: true })
  @ManyToOne(type => Picture, x => x.campgrounds, { eager: true })
  picture: Picture;
}
