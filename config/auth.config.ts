import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface AuthConfig {
  JWT_SECRET_WEB_KEY: string;
  JWT_SECRET_KEY: string;
  JWT_EXPIRES_IN: string;
  JWT_EXPIRES_REMEMBER_IN: string;
  SALT_ROUND: number;
}

const SCHEMA = yup.object({
  JWT_SECRET_WEB_KEY: yup.string().required(),
  JWT_SECRET_KEY: yup.string().required(),
  JWT_EXPIRES_IN: yup.string().default('1d'),
  JWT_EXPIRES_REMEMBER_IN: yup.string().default('3d'),
  SALT_ROUND: yup.number().default(8),
});

export default registerAs('auth', async (): Promise<AuthConfig> => {
  const env = await SCHEMA.validate(process.env);

  let value;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – AUTH: ' + error.errors);
  }
  return value;
});
