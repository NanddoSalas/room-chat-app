import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql';
import { AuthRequired } from '../../decorators';
import { Member, Message, Room, User } from '../../entities';
import {
  Context,
  NewMessagePayload,
  UserJoinedRoomPayload,
  UserLeavedRoomPayload,
} from '../../types';
import MessagesPayload from './messages/MessagesPayload';

@Resolver()
class MessageResolver {
  @AuthRequired()
  @Query(() => MessagesPayload)
  async messages(
    @Arg('roomId', () => ID) roomId: number,
    @Arg('cursor', () => ID, { nullable: true }) cursor: number,
    @Ctx() { user }: Context,
  ): Promise<MessagesPayload> {
    const member = await Member.findOne({
      where: {
        userId: user!.id,
        roomId,
      },
    });

    if (!member) return { messages: [] };

    const query = Message.createQueryBuilder('message').where(
      'message.roomId = :roomId',
      { roomId },
    );

    if (cursor) query.andWhere('message.id < :cursor', { cursor });

    query.orderBy('message.createdAt', 'DESC').take(20);

    const messages = await query.getMany();

    return { messages, cursor: messages[messages.length - 1]?.id };
  }

  @AuthRequired()
  @Mutation(() => Message, { nullable: true })
  async sendMessage(
    @Arg('message') message: string,
    @Arg('roomId', () => ID) roomId: number,
    @Ctx() { user }: Context,
    @PubSub('NEW_MESSAGE') publish: Publisher<NewMessagePayload>,
  ): Promise<Message | undefined> {
    const member = await Member.findOne({
      where: {
        userId: user!.id,
        roomId,
      },
    });

    if (!member) return undefined;

    const room = await Room.findOne(roomId);

    if (!room) return undefined;

    const newMessage = Message.create({ message });
    newMessage.user = Promise.resolve(user!);
    newMessage.room = Promise.resolve(room);
    await newMessage.save();

    await publish({
      messageId: newMessage.id.toString(),
      roomId: roomId.toString(),
    });

    return newMessage;
  }

  @Subscription(() => Message, {
    topics: 'NEW_MESSAGE',
    filter: ({ args, payload }) => args.roomId === payload.roomId,
  })
  async newMessage(
    @Root() payload: NewMessagePayload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg('roomId', () => ID) _roomId: string,
  ): Promise<Message> {
    return Message.findOneOrFail(payload.messageId);
  }

  @Subscription(() => User, {
    topics: 'USER_JOINED_ROOM',
    filter: ({ args, payload }) => args.roomId === payload.roomId,
  })
  async userJoinedRoom(
    @Root() payload: UserJoinedRoomPayload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg('roomId', () => ID) _roomId: string,
  ): Promise<User> {
    return User.findOneOrFail({ where: { id: payload.userId } });
  }

  @Subscription(() => String, {
    topics: 'USER_LEAVED_ROOM',
    filter: ({ args, payload }) => args.roomId === payload.roomId,
  })
  async userLeavedRoom(
    @Root() payload: UserLeavedRoomPayload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Arg('roomId', () => ID) _roomId: string,
  ): Promise<string> {
    return payload.userId;
  }
}

export default MessageResolver;
