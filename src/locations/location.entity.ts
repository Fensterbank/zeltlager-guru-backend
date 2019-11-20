import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Campground } from '../campground/campground.entity';
import { Organisation } from '../organisations/organisation.entity';

@Entity()
export class Location extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zip: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  city: string;

  @Column({ type: 'decimal' })
  lat: number;

  @Column({ type: 'decimal' })
  lng: number;

  @OneToMany(type => Campground, x => x.location, { eager: false, nullable: true })
  campgrounds: Campground[];

  @OneToMany(type => Organisation, x => x.location, { eager: false, nullable: true })
  organisations: Organisation[];
}
