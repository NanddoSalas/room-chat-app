import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
  __typename?: 'Message';
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


export type SendMessageMutation = { __typename?: 'Mutation', sendedMessage?: { __typename?: 'Message', id: string, message: string, userId: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, name: string, avatar: string } | null | undefined };

export type MessagesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['ID']>;
  roomId: Scalars['ID'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesPayload', cursor?: string | null | undefined, messages: Array<{ __typename?: 'Message', id: string, message: string, userId: string }> } };

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
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const GoogleAuthDocument = gql`
    mutation GoogleAuth($idToken: String!) {
  me: googleAuth(idToken: $idToken) {
    id
    name
    avatar
  }
}
    `;
export type GoogleAuthMutationFn = Apollo.MutationFunction<GoogleAuthMutation, GoogleAuthMutationVariables>;

/**
 * __useGoogleAuthMutation__
 *
 * To run a mutation, you first call `useGoogleAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleAuthMutation, { data, loading, error }] = useGoogleAuthMutation({
 *   variables: {
 *      idToken: // value for 'idToken'
 *   },
 * });
 */
export function useGoogleAuthMutation(baseOptions?: Apollo.MutationHookOptions<GoogleAuthMutation, GoogleAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoogleAuthMutation, GoogleAuthMutationVariables>(GoogleAuthDocument, options);
      }
export type GoogleAuthMutationHookResult = ReturnType<typeof useGoogleAuthMutation>;
export type GoogleAuthMutationResult = Apollo.MutationResult<GoogleAuthMutation>;
export type GoogleAuthMutationOptions = Apollo.BaseMutationOptions<GoogleAuthMutation, GoogleAuthMutationVariables>;
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
export type JoinRoomMutationFn = Apollo.MutationFunction<JoinRoomMutation, JoinRoomMutationVariables>;

/**
 * __useJoinRoomMutation__
 *
 * To run a mutation, you first call `useJoinRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinRoomMutation, { data, loading, error }] = useJoinRoomMutation({
 *   variables: {
 *      invitationCode: // value for 'invitationCode'
 *   },
 * });
 */
export function useJoinRoomMutation(baseOptions?: Apollo.MutationHookOptions<JoinRoomMutation, JoinRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinRoomMutation, JoinRoomMutationVariables>(JoinRoomDocument, options);
      }
export type JoinRoomMutationHookResult = ReturnType<typeof useJoinRoomMutation>;
export type JoinRoomMutationResult = Apollo.MutationResult<JoinRoomMutation>;
export type JoinRoomMutationOptions = Apollo.BaseMutationOptions<JoinRoomMutation, JoinRoomMutationVariables>;
export const LeaveRoomDocument = gql`
    mutation LeaveRoom($roomId: ID!) {
  leavedRoomId: leaveRoom(roomId: $roomId)
}
    `;
export type LeaveRoomMutationFn = Apollo.MutationFunction<LeaveRoomMutation, LeaveRoomMutationVariables>;

/**
 * __useLeaveRoomMutation__
 *
 * To run a mutation, you first call `useLeaveRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveRoomMutation, { data, loading, error }] = useLeaveRoomMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useLeaveRoomMutation(baseOptions?: Apollo.MutationHookOptions<LeaveRoomMutation, LeaveRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveRoomMutation, LeaveRoomMutationVariables>(LeaveRoomDocument, options);
      }
export type LeaveRoomMutationHookResult = ReturnType<typeof useLeaveRoomMutation>;
export type LeaveRoomMutationResult = Apollo.MutationResult<LeaveRoomMutation>;
export type LeaveRoomMutationOptions = Apollo.BaseMutationOptions<LeaveRoomMutation, LeaveRoomMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($roomId: ID!, $message: String!) {
  sendedMessage: sendMessage(roomId: $roomId, message: $message) {
    id
    message
    userId
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MessagesDocument = gql`
    query Messages($cursor: ID, $roomId: ID!) {
  messages(cursor: $cursor, roomId: $roomId) {
    cursor
    messages {
      id
      message
      userId
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const RoomMembersDocument = gql`
    query RoomMembers($roomId: ID!) {
  roomMembers(roomId: $roomId) {
    id
    name
    avatar
  }
}
    `;

/**
 * __useRoomMembersQuery__
 *
 * To run a query within a React component, call `useRoomMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMembersQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomMembersQuery(baseOptions: Apollo.QueryHookOptions<RoomMembersQuery, RoomMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomMembersQuery, RoomMembersQueryVariables>(RoomMembersDocument, options);
      }
export function useRoomMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomMembersQuery, RoomMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomMembersQuery, RoomMembersQueryVariables>(RoomMembersDocument, options);
        }
export type RoomMembersQueryHookResult = ReturnType<typeof useRoomMembersQuery>;
export type RoomMembersLazyQueryHookResult = ReturnType<typeof useRoomMembersLazyQuery>;
export type RoomMembersQueryResult = Apollo.QueryResult<RoomMembersQuery, RoomMembersQueryVariables>;
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

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, options);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;
export const UserDocument = gql`
    query User($userId: ID!) {
  user(userId: $userId) {
    avatar
    name
    id
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;