import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as schema from './schema';

const client = new Client({
  connectionString: import.meta.env.VITE_DB_URL,
});

await client.connect();
const db = drizzle(client, {schema});

export default db;
