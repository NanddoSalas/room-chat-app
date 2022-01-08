import { AuthenticationError } from 'apollo-server-core';
import { createMethodDecorator } from 'type-graphql';
import { Context } from './types';

export function AuthRequired() {
  return createMethodDecorator<Context>(async ({ context }, next) => {
    if (!context.user) {
      throw new AuthenticationError('');
    }

    return next();
  });
}
