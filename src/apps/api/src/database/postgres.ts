import { Pool } from 'pg';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from '../constants';

export const database = new Pool({
  user: DATABASE_USER,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: 5432,
});
