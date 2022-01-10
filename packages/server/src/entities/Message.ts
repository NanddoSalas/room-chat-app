import { Field, GraphQLTimestamp, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room, User } from '.';

@Entity()
@ObjectType()
class Message extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  message: string;

  @Field(() => GraphQLTimestamp)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => ID)
  @Column()
  userId: number;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.messages)
  user: Promise<User>;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Promise<Room>;
}

export default Message;
