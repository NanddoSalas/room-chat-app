import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: number;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  message: Scalars['String'];
  userId: Scalars['ID'];
};

export type MessagesPayload = {
  __typename?: 'MessagesPayload';
  cursor?: Maybe<Scalars['ID']>;
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom?: Maybe<Room>;
  googleAuth?: Maybe<User>;
  joinRoom?: Maybe<Room>;
  leaveRoom: Scalars['ID'];
  sendMessage?: Maybe<Message>;
};


export type MutationCreateRoomArgs = {
  name: Scalars['String'];
};


export type MutationGoogleAuthArgs = {
  idToken: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  invitationCode: Scalars['String'];
};


export type MutationLeaveRoomArgs = {
  roomId: Scalars['ID'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String'];
  roomId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  messages: MessagesPayload;
  roomMembers: Array<User>;
  rooms: Array<Room>;
  user?: Maybe<User>;
};


export type QueryMessagesArgs = {
  cursor?: InputMaybe<Scalars['ID']>;
  roomId: Scalars['ID'];
};


export type QueryRoomMembersArgs = {
  roomId: Scalars['ID'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type Room = {
  __typename?: 'Room';
  adminId: Scalars['ID'];
  id: Scalars['ID'];
  invitationCode: Scalars['String'];
  name: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
  userJoinedRoom: User;
  userLeavedRoom: Scalars['String'];
};


export type SubscriptionNewMessageArgs = {
  roomId: Scalars['ID'];
};


export type SubscriptionUserJoinedRoomArgs = {
  roomId: Scalars['ID'];
};


export type SubscriptionUserLeavedRoomArgs = {
  roomId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', newRoom?: { __typename?: 'Room', id: string, invitationCode: string, name: string, adminId: string } | null | undefined };

export type GoogleAuthMutationVariables = Exact<{
  idToken: Scalars['String'];
}>;


export type GoogleAuthMutation = { __typename?: 'Mutation', me?: { __typename?: 'User', id: string, name: string, avatar: string } | null | undefined };

export type JoinRoomMutationVariables = Exact<{
  invitationCode: Scalars['String'];
}>;


export type JoinRoomMutation = { __typename?: 'Mutation', room?: { __typename?: 'Room', id: string, name: string, invitationCode: string, adminId: string } | null | undefined };

export type LeaveRoomMutationVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type LeaveRoomMutation = { __typename?: 'Mutation', leavedRoomId: string };

export type SendMessageMutationVariables = Exact<{
  roomId: Scalars['ID'];
  message: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendedMessage?: { __typename?: 'Message', id: string, message: string, userId: string, createdAt: number } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, avatar: string } | null | undefined };

export type MessagesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']>;
  roomId: Scalars['ID'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesPayload', cursor?: string | null | undefined, messages: Array<{ __typename?: 'Message', id: string, message: string, userId: string, createdAt: number }> } };

export type RoomMembersQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomMembersQuery = { __typename?: 'Query', roomMembers: Array<{ __typename?: 'User', id: string, name: string, avatar: string }> };

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = { __typename?: 'Query', rooms: Array<{ __typename?: 'Room', id: string, name: string, invitationCode: string, adminId: string }> };

export type UserQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', avatar: string, name: string, id: string } | null | undefined };

export type NewMessageSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: string, message: string, userId: string, createdAt: number } };

export type UserJoinedRoomSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type UserJoinedRoomSubscription = { __typename?: 'Subscription', userJoinedRoom: { __typename?: 'User', id: string, name: string, avatar: string } };

export type UserLeavedRoomSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type UserLeavedRoomSubscription = { __typename?: 'Subscription', userLeavedRoom: string };


export const CreateRoomDocument = gql`
    mutation CreateRoom($name: String!) {
  newRoom: createRoom(name: $name) {
    id
    invitationCode
    name
    adminId
  }
}
    `;

export function useCreateRoomMutation() {
  return Urql.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument);
};
export const GoogleAuthDocument = gql`
    mutation GoogleAuth($idToken: String!) {
  me: googleAuth(idToken: $idToken) {
    id
    name
    avatar
  }
}
    `;

export function useGoogleAuthMutation() {
  return Urql.useMutation<GoogleAuthMutation, GoogleAuthMutationVariables>(GoogleAuthDocument);
};
export const JoinRoomDocument = gql`
    mutation JoinRoom($invitationCode: String!) {
  room: joinRoom(invitationCode: $invitationCode) {
    id
    name
    invitationCode
    adminId
  }
}
    `;

export function useJoinRoomMutation() {
  return Urql.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument);
};
export const LeaveRoomDocument = gql`
    mutation LeaveRoom($roomId: ID!) {
  leavedRoomId: leaveRoom(roomId: $roomId)
}
    `;

export function useLeaveRoomMutation() {
  return Urql.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument);
};
export const SendMessageDocument = gql`
    mutation SendMessage($roomId: ID!, $message: String!) {
  sendedMessage: sendMessage(roomId: $roomId, message: $message) {
    id
    message
    userId
    createdAt
  }
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    avatar
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MessagesDocument = gql`
    query Messages($cursor: ID, $roomId: ID!) {
  messages(cursor: $cursor, roomId: $roomId) {
    cursor
    messages {
      id
      message
      userId
      createdAt
    }
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const RoomMembersDocument = gql`
    query RoomMembers($roomId: ID!) {
  roomMembers(roomId: $roomId) {
    id
    name
    avatar
  }
}
    `;

export function useRoomMembersQuery(options: Omit<Urql.UseQueryArgs<RoomMembersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomMembersQuery>({ query: RoomMembersDocument, ...options });
};
export const RoomsDocument = gql`
    query Rooms {
  rooms {
    id
    name
    invitationCode
    adminId
  }
}
    `;

export function useRoomsQuery(options: Omit<Urql.UseQueryArgs<RoomsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomsQuery>({ query: RoomsDocument, ...options });
};
export const UserDocument = gql`
    query User($userId: ID!) {
  user(userId: $userId) {
    avatar
    name
    id
  }
}
    `;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const NewMessageDocument = gql`
    subscription NewMessage($roomId: ID!) {
  newMessage(roomId: $roomId) {
    id
    message
    userId
    createdAt
  }
}
    `;

export function useNewMessageSubscription<TData = NewMessageSubscription>(options: Omit<Urql.UseSubscriptionArgs<NewMessageSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NewMessageSubscription, TData>) {
  return Urql.useSubscription<NewMessageSubscription, TData, NewMessageSubscriptionVariables>({ query: NewMessageDocument, ...options }, handler);
};
export const UserJoinedRoomDocument = gql`
    subscription UserJoinedRoom($roomId: ID!) {
  userJoinedRoom(roomId: $roomId) {
    id
    name
    avatar
  }
}
    `;

export function useUserJoinedRoomSubscription<TData = UserJoinedRoomSubscription>(options: Omit<Urql.UseSubscriptionArgs<UserJoinedRoomSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UserJoinedRoomSubscription, TData>) {
  return Urql.useSubscription<UserJoinedRoomSubscription, TData, UserJoinedRoomSubscriptionVariables>({ query: UserJoinedRoomDocument, ...options }, handler);
};
export const UserLeavedRoomDocument = gql`
    subscription UserLeavedRoom($roomId: ID!) {
  userLeavedRoom(roomId: $roomId)
}
    `;

export function useUserLeavedRoomSubscription<TData = UserLeavedRoomSubscription>(options: Omit<Urql.UseSubscriptionArgs<UserLeavedRoomSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<UserLeavedRoomSubscription, TData>) {
  return Urql.useSubscription<UserLeavedRoomSubscription, TData, UserLeavedRoomSubscriptionVariables>({ query: UserLeavedRoomDocument, ...options }, handler);
};