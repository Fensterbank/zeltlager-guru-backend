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
import { Organisation } from '../organisations/organisation.entity';
import { CampEvent } from '../campevents/campevent.entity';

@Entity()
export class Camp extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  teamCount: number;

  @Column()
  kidsCount: number;

  @Column()
  minAge: number;

  @Column()
  maxAge: number;

  @ManyToOne(type => Organisation, x => x.camps, { eager: true, nullable: false })
  organisation: Organisation;

  @OneToMany(type => CampEvent, x => x.camp, { eager: false, nullable: false })
  campEvents: CampEvent[];
}
