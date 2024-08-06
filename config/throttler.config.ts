import { registerAs } from '@nestjs/config';
import * as yup from 'yup';
import { validationOptions } from './validation.options';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface ThrottlerConfig {
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;
}

const SCHEMA = yup.object({
  THROTTLE_TTL: yup.number().required(),
  THROTTLE_LIMIT: yup.number().required(),
});

export default registerAs('throttler', async (): Promise<ThrottlerConfig> => {
  const env = await SCHEMA.validate(process.env);

  let value;
  try {
    value = SCHEMA.validateSync(env, validationOptions);
  } catch (error) {
    throw Error('ENV validation failed – Throttler: ' + error.errors);
  }
  return value;
});
