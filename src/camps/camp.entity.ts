import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';
import { Organisation } from '../organisations/organisation.entity';
import { CampEvent } from '../campevents/campevent.entity';
import { Picture } from '../pictures/picture.entity';

@Entity()
@ObjectType()
export class Camp extends BaseEntity {
  constructor() {
    super();
  }

  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  teamCount: number;

  @Field(type => Int, { nullable: true })
  @Column({ nullable: true })
  kidsCount: number;

  @Field(type => Int)
  @Column()
  minAge: number;

  @Field(type => Int)
  @Column()
  maxAge: number;

  @Field(type => Organisation)
  @ManyToOne(type => Organisation, x => x.camps, { eager: true, nullable: false })
  organisation: Organisation;

  @Field(type => [CampEvent])
  @OneToMany(type => CampEvent, x => x.camp, { eager: false, nullable: false })
  campEvents: CampEvent[];

  @Field(type => Picture, { nullable: true })
  @ManyToOne(type => Picture, x => x.camps, { eager: true })
  picture: Picture;
}
