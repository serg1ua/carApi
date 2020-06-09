import { ConnectionOptions } from 'typeorm';
import { entities } from './modules';
import config from './config';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  synchronize: true,
  entities,
};
