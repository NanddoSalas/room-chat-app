import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer, ExpressContext } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import { CloseCode } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { WebSocketServer } from 'ws';
import entities, { Member } from './entities';
import { getUser } from './utils';

dotenv.config({ path: `${__dirname}/../../../.env` });

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities,
  });

  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.resolver.{ts,js}'],
  });

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }: ExpressContext) => {
      const user = await getUser(req.headers.authorization || '');

      return { req, res, user };
    },
    schema,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer(
    {
      schema,

      context: async (ctx, _message, args) => {
        const bearerHeader =
          (ctx.connectionParams?.Authorization as string) || '';
        const roomId = (args.variableValues?.roomId as string) || '';

        if (!roomId || !bearerHeader)
          return ctx.extra.socket.close(CloseCode.Forbidden, 'Forbidden');

        const user = await getUser(bearerHeader);

        if (!user)
          return ctx.extra.socket.close(CloseCode.Forbidden, 'Forbidden');

        const member = await Member.findOne({
          where: {
            userId: user!.id,
            roomId,
          },
        });

        if (!member)
          return ctx.extra.socket.close(CloseCode.Forbidden, 'Forbidden');

        return { ...ctx, user };
      },
    },
    wsServer,
  );

  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`,
  );
};

main();
