// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Request } from 'express';
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

export const getUser = async (req: Request) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const [, accesToken] = bearerHeader.split(' ');

    try {
      const payload = jwt.verify(accesToken, process.env.SECRET_KEY!);
      const user = await User.findOne({
        where: { id: (payload as any).userId },
      });

      if (user?.tokenVersion === (payload as any).tokenVersion) return user;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};
