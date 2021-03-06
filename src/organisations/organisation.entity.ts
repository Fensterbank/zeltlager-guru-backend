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
import { Camp } from '../camps/camp.entity';
import { Picture } from '../pictures/picture.entity';

@ObjectType()
@Entity()
export class Organisation extends BaseEntity {
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

  @Field()
  @Column()
  religion: string;

  @Field(type => Location)
  @ManyToOne(type => Location, x => x.campgrounds, { eager: true })
  location: Location;

  @Field(type => [Camp], { nullable: true })
  @OneToMany(type => Camp, x => x.organisation, { eager: false, nullable: false })
  camps: Camp[];

  @Field(type => Picture, { nullable: true })
  @ManyToOne(type => Picture, x => x.organisations, { eager: true })
  picture: Picture;
}
