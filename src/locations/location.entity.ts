import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Campground } from 'src/campground/campground.entity';
import { Organisation } from 'src/organisations/organisation.entity';

@Entity()
export class Location extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zip: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @OneToMany(type => Campground, x => x.location, { eager: false, nullable: true })
  campgrounds: Campground[];

  @OneToMany(type => Organisation, x => x.location, { eager: false, nullable: true })
  organisations: Organisation[];
}
