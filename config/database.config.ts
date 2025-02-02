import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface responseConfig {
  type: string;
  host: string;
  port: number;
  dbName: string;
  user: string;
  pass: string;
}

export interface DbConfig {
  DB_TYPE: string;
  DB_PORT: number;
  DB_HOST: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
}

const SCHEMA = yup.object({
  DB_TYPE: yup.string().default('mysql'),
  DB_PORT: yup.number().default(3306),
  DB_HOST: yup.string().default('localhost'),
  DB_NAME: yup.string().required(),
  DB_USER: yup.string().optional(),
  DB_PASS: yup.string().optional(),
});

export default registerAs('db', async (): Promise<any> => {
  const env = await SCHEMA.validate(process.env);

  let value;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – DB: ' + error.errors);
  }
  return {
    type: value.DB_TYPE,
    host: value.DB_HOST,
    port: value.DB_PORT,
    username: value.DB_USER,
    password: value.DB_PASS,
    database: value.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: false,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    logging: process.env.NODE_ENV === 'development',
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  };
});
