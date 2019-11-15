import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity()
export class Organisation extends BaseEntity {
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
  url: string;

  @Column()
  religion: string;

  @ManyToOne(type => Location, x => x.campgrounds, { eager: true })
  location: Location;
}
