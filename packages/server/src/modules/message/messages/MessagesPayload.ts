import { Field, ID, ObjectType } from 'type-graphql';
import { Message } from '../../../entities';

@ObjectType()
class MessagesPayload {
  @Field(() => [Message])
  messages: Message[];

  @Field(() => ID, { nullable: true })
  cursor?: number;
}

export default MessagesPayload;
