import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Camp } from '../camps/camp.entity';
import { Campground } from '../campground/campground.entity';

@Entity()
export class CampEvent extends BaseEntity {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  motto: string;

  @Column()
  begin: Date;

  @Column()
  end: Date;

  @Column({ nullable: true })
  teamCount: number;

  @Column({ nullable: true })
  kidsCount: number;

  @ManyToOne(type => Camp, x => x.campEvents, { eager: true, nullable: false })
  camp: Camp;

  @ManyToOne(type => Campground, x => x.campevents, { eager: true, nullable: false })
  campground: Campground;
}
