import { createDbTables } from './scripts/create-db-tables';
import { SERVER_PORT } from './constants';
import app from './app';

async function main() {
  await createDbTables();
  app.listen(SERVER_PORT, () => console.log(`Server on port ${SERVER_PORT}`));
}

main();
