import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member, Message } from '.';
import User from './User';

@Entity()
@ObjectType()
class Room extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column({ unique: true })
  invitationCode: string;

  @Field(() => ID)
  @Column()
  adminId: number;

  @ManyToOne(() => User, (user) => user.rooms)
  admin: Promise<User>;

  @OneToMany(() => Member, (member) => member.room)
  members: Promise<Member[]>;

  @OneToMany(() => Message, (message) => message.room)
  messages: Promise<Message[]>;
}

export default Room;
