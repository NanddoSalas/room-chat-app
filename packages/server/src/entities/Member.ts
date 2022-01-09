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
class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.memberOf)
  user: Promise<User>;

  @ManyToOne(() => Room, (room) => room.members)
  room: Promise<Room>;
}

export default Member;
