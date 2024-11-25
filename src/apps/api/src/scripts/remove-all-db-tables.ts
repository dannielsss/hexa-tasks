import { DATABASE_TABLES_LIST } from '../constants/database-tables-list';
import { database } from '../database/postgres';

export async function removeDbTables() {
  for (let i = 0; i < DATABASE_TABLES_LIST.length; i++) {
    const table = DATABASE_TABLES_LIST[i];

    await database.query(`drop table ${table}`);
    console.log(`${table} removed`);
  }

  console.log('Tables correctly eliminated');
}
