import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room, User } from '.';

@Entity()
class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roomId: number;

  @ManyToOne(() => User, (user) => user.memberOf)
  user: Promise<User>;

  @ManyToOne(() => Room, (room) => room.members)
  room: Promise<Room>;
}

export default Member;
