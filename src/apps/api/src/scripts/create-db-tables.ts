import fs from 'fs';
import path from 'path';

import { database } from '../database/postgres';

export async function createDbTables() {
  const tableNames = ['label', 'task', 'task_label', 'task_status'];
  const searchTablesQuery = `
  SELECT tablename
    FROM pg_tables
    WHERE tablename IN (${tableNames.map((name) => `'${name}'`).join(',')});
  `;

  const result = await database.query(searchTablesQuery);
  if (result.rows.length === tableNames.length) return;

  try {
    const tablesSQLFile = fs.readFileSync(
      path.resolve(__dirname, '..', '..', 'sql', 'tables.sql'),
      'utf8'
    );
    await database.query(tablesSQLFile);

    console.log('Script "create-db-tables.ts" excuted successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Script "create-db-tables.ts" has an error: ');
  }
}
