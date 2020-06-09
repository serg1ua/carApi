import * as dotenv from 'dotenv';
dotenv.config();

const config: any = {
  NODE_ENV: process.env.NODE_ENV,
  DISCOUNT: process.env.DISCOUNT,
  START_MONTH: process.env.START_MONTH,
  END_MONTH: process.env.END_MONTH,
  PORT: process.env.PORT,
  POSTGRES_HOST:
    process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test'
      ? 'localhost'
      : 'postgres',
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  PGADMIN_PORT: process.env.PGADMIN_PORT,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
};

export default config;
