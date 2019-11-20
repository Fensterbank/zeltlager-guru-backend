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
import { Camp } from '../camps/camp.entity';

@Entity()
export class Organisation extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @Column()
  religion: string;

  @ManyToOne(type => Location, x => x.campgrounds, { eager: true })
  location: Location;

  @OneToMany(type => Camp, x => x.organisation, { eager: false, nullable: false })
  camps: Camp[];
}
