// eslint-disable-next-line @typescript-eslint/no-redeclare
import { Request, Response } from 'express';
import { User } from './entities';

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

export interface NewMessagePayload {
  messageId: string;
  roomId: string;
}

export interface UserJoinedRoomPayload {
  userId: string;
  roomId: string;
}

export interface UserLeavedRoomPayload {
  userId: string;
  roomId: string;
}
