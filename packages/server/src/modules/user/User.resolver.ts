import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { AuthRequired } from '../../decorators';
import { User } from '../../entities';
import { Context } from '../../types';
import { authenticateWithGoogle, createAccesToken } from '../../utils';

@Resolver()
class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: Context): User | undefined {
    return user;
  }

  @AuthRequired()
  @Query(() => User, { nullable: true })
  async user(@Arg('userId') userId: number): Promise<User | undefined> {
    return User.findOne(userId);
  }

  @Mutation(() => User, { nullable: true })
  async googleAuth(
    @Arg('idToken') idToken: string,
    @Ctx() { res }: Context,
  ): Promise<User | undefined> {
    const user = await authenticateWithGoogle(idToken);

    if (user) {
      const accesToken = await createAccesToken(user);
      res.cookie('accesToken', accesToken);
    }

    return user;
  }
}

export default UserResolver;
