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
import { Field, ID, ObjectType } from 'type-graphql';
import { Organisation } from '../organisations/organisation.entity';
import { CampEvent } from '../campevents/campevent.entity';

@Entity()
@ObjectType()
export class Camp extends BaseEntity {
  constructor() {
    super();
  }

  @Field(type => ID)
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

  @Field({ nullable: true })
  @Column({ nullable: true })
  teamCount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  kidsCount: number;

  @Field()
  @Column()
  minAge: number;

  @Field()
  @Column()
  maxAge: number;

  @Field(type => Organisation)
  @ManyToOne(type => Organisation, x => x.camps, { eager: true, nullable: false })
  organisation: Organisation;

  @Field(type => [CampEvent])
  @OneToMany(type => CampEvent, x => x.camp, { eager: false, nullable: false })
  campEvents: CampEvent[];
}
