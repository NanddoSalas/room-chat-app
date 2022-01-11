import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import { createClient as createWSClient } from 'graphql-ws';
import Cookies from 'js-cookie';
import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql';
import {
  MeDocument,
  MeQuery,
  Room,
  RoomsDocument,
  RoomsQuery,
  User,
} from '../generated/graphql';

const wsClient = createWSClient({
  url: 'ws://localhost:4000/subscriptions',
  connectionParams: () => {
    const accessToken = Cookies.get('accessToken');

    return { Authorization: accessToken ? `Bearer ${accessToken}` : '' };
  },
});

export const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: () => {
    const accessToken = Cookies.get('accessToken');

    return {
      headers: { authorization: accessToken ? `Bearer ${accessToken}` : '' },
      credentials: 'include',
    };
  },
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          googleAuth(result, _args, cache, _info) {
            const me = result.me as User;

            if (me) {
              cache.updateQuery<MeQuery>({ query: MeDocument }, () => {
                return { __typename: 'Query', me };
              });
            }
          },
          createRoom(result, _args, cache, _info) {
            const newRoom = result.newRoom as Room | undefined;

            if (newRoom) {
              cache.updateQuery<RoomsQuery>(
                { query: RoomsDocument },
                (data) => {
                  if (!data) return null;

                  data.rooms.push(newRoom);

                  return data;
                },
              );
            }
          },
          joinRoom(result, _args, cache, _info) {
            const room = result.room as Room | undefined;

            if (room) {
              cache.updateQuery<RoomsQuery>(
                { query: RoomsDocument },
                (data) => {
                  if (!data) return null;

                  data.rooms.push(room);

                  return data;
                },
              );
            }
          },
          leaveRoom(result, _args, cache, _info) {
            const leavedRoomId = (result.leavedRoomId as string) || '';

            if (leavedRoomId) {
              cache.updateQuery<RoomsQuery>(
                {
                  query: RoomsDocument,
                },

                (data) => {
                  if (!data) return null;

                  data.rooms = data.rooms.filter(
                    ({ id }) => id !== leavedRoomId,
                  );

                  return data;
                },
              );
            }
          },
        },
      },
    }),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(operation, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});
