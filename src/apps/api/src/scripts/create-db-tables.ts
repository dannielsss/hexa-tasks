import fs from 'fs';
import path from 'path';

import { DATABASE_TABLES_LIST } from '../constants/database-tables-list';
import { database } from '../database/postgres';

export async function createDbTables() {
  const searchTablesQuery = `
  SELECT tablename
    FROM pg_tables
    WHERE tablename IN (${DATABASE_TABLES_LIST.map((name) => `'${name}'`).join(
      ','
    )});
  `;

  const result = await database.query(searchTablesQuery);
  if (result.rows.length === DATABASE_TABLES_LIST.length) return;

  try {
    const tablesSQLFile = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'sql', 'tables.sql'),
      'utf8'
    );
    await database.query(tablesSQLFile);

    console.log('The following tables have been successfully created');
    console.log(DATABASE_TABLES_LIST);
  } catch (error) {
    console.log(error);
    throw new Error('Script "create-db-tables.ts" has an error.');
  }
}
