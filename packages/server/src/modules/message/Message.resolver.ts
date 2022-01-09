import { Arg, Ctx, ID, Mutation, Query, Resolver } from 'type-graphql';
import { AuthRequired } from '../../decorators';
import { Member, Message, Room } from '../../entities';
import { Context } from '../../types';
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

    return newMessage;
  }
}

export default MessageResolver;
