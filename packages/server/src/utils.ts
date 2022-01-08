import jwt from 'jsonwebtoken';
import { User } from './entities';
import googleClient from './googleClient';

export const authenticateWithGoogle = async (idToken: string) => {
  try {
    const loginTicket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = loginTicket.getPayload();

    if (!payload) return undefined;

    const user = await User.findOne({ where: { googleId: payload.sub } });

    if (user) return user;

    return await User.create({
      name: payload.name,
      avatar: payload.picture,
      googleId: payload.sub,
    }).save();
  } catch (error) {
    return undefined;
  }
};

export const createAccesToken = async (user: User) => {
  const payload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };

  return jwt.sign(payload, process.env.SECRET_KEY!);
};
