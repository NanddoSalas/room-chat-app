import short from 'short-uuid';
import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { AuthRequired } from '../../decorators';
import { Member, Room, User } from '../../entities';
import { Context } from '../../types';

@Resolver()
class RoomResolver {
  @AuthRequired()
  @Query(() => [Room])
  async rooms(@Ctx() { user }: Context): Promise<Room[]> {
    return Room.createQueryBuilder('room')
      .innerJoinAndSelect('room.members', 'member', 'member.userId = :userId', {
        userId: user!.id,
      })
      .getMany();
  }

  @AuthRequired()
  @Query(() => [User])
  async roomMembers(
    @Arg('roomId', () => ID) roomId: number,
    @Ctx() { user }: Context,
  ): Promise<User[]> {
    const member = await Member.findOne({
      where: {
        userId: user!.id,
        roomId,
      },
    });

    if (!member) return [];

    return User.createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.memberOf',
        'member',
        'member.roomId = :roomId',
        { roomId },
      )
      .getMany();
  }

  @AuthRequired()
  @Mutation(() => Room, { nullable: true })
  async createRoom(
    @Arg('name') name: string,
    @Ctx() { user }: Context,
  ): Promise<Room | undefined> {
    const room = new Room();

    room.name = name;
    room.admin = Promise.resolve(user!);
    room.invitationCode = short.generate();

    return room.save();
  }

  @AuthRequired()
  @Mutation(() => Room, { nullable: true })
  async joinRoom(
    @Arg('invitationCode') invitationCode: string,
    @Ctx() { user }: Context,
  ): Promise<Room | undefined> {
    const room = await Room.findOne({ where: { invitationCode } });

    if (!room) return undefined;

    const member = new Member();
    member.user = Promise.resolve(user!);
    member.room = Promise.resolve(room);
    await member.save();

    return room;
  }

  @AuthRequired()
  @Mutation(() => ID)
  async leaveRoom(
    @Arg('roomId', () => ID) roomId: number,
    @Ctx() { user }: Context,
  ): Promise<number | undefined> {
    const members = await Member.find({
      where: { roomId },
      take: 2,
      order: {
        createdAt: 'ASC',
      },
    });

    const admin = members[0];
    const nextAdmin = members[1];

    if (admin.id === user!.id && nextAdmin) {
      if (nextAdmin) {
        await Room.createQueryBuilder('room')
          .update()
          .set({ adminId: nextAdmin.id })
          .where('room.id = :roomId', { roomId })
          .execute();
      } else {
        // TODO: delete room
      }
    }

    await Member.createQueryBuilder('member')
      .where('member.userId = :userId', {
        userId: user!.id,
      })
      .andWhere('member.roomId = : roomId', { roomId })
      .execute();

    return roomId;
  }
}

export default RoomResolver;
