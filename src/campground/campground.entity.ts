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
import { Location } from '../locations/location.entity';
import { CampEvent } from '../campevents/campevent.entity';

@Entity()
export class Campground extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(type => Location, x => x.campgrounds, { eager: true })
  location: Location;

  @OneToMany(type => CampEvent, x => x.campground, { eager: false, nullable: false })
  campevents: CampEvent[];
}
