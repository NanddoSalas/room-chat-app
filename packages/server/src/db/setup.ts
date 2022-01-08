import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import entities from '../entities';

dotenv.config({ path: `${__dirname}/../../../../.env` });

createConnection({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities,
})
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
