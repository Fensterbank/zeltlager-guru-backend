import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import { PermissionLevel } from './permission-level.enum';

@ObjectType()
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  salt: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  permissionLevel: PermissionLevel;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

@ObjectType()
export class AuthUser {
  @Field(type => ID)
  id: number;

  @Field()
  username: string;

  @Field()
  permissionLevel: PermissionLevel;

  @Field()
  accessToken: string;
}
