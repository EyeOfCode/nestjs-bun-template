import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AppConfig {
  NODE_ENV: string;
  PORT: number;
}

const SCHEMA = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'staging', 'test'])
    .default('development'),
  PORT: yup.number().default(8000),
});

export default registerAs('app', async (): Promise<AppConfig> => {
  const env = await SCHEMA.validate(process.env);

  let value;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – APP: ' + error.errors);
  }
  return value;
});
