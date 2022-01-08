import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member, Message } from '.';
import Room from './Room';

@Entity()
@ObjectType()
class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  avatar: string;

  @PrimaryColumn()
  googleId: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  tokenVersion: number;

  @OneToMany(() => Room, (room) => room.admin)
  rooms: Promise<Room[]>;

  @OneToMany(() => Member, (member) => member.user)
  memberOf: Promise<Member[]>;

  @OneToMany(() => Message, (message) => message.user)
  messages: Promise<Message[]>;
}

export default User;
