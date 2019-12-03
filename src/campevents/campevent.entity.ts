import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { Camp } from '../camps/camp.entity';
import { Campground } from '../campground/campground.entity';
import { Picture } from '../pictures/picture.entity';

@ObjectType()
@Entity()
export class CampEvent extends BaseEntity {
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  motto: string;

  @Field()
  @Column()
  begin: Date;

  @Field()
  @Column()
  end: Date;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  teamCount: number;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  kidsCount: number;

  @Field(type => Camp)
  @ManyToOne(type => Camp, x => x.campEvents, { eager: true, nullable: false })
  camp: Camp;

  @Field(type => Campground)
  @ManyToOne(type => Campground, x => x.campevents, { eager: true, nullable: false })
  campground: Campground;

  @Field(type => Picture, { nullable: true })
  @ManyToOne(type => Picture, x => x.campEvents, { eager: true })
  picture: Picture;
}
