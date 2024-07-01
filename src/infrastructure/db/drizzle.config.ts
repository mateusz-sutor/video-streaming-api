import { defineConfig } from 'drizzle-kit';

export default defineConfig({
 schema: "./schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: import.meta.env.VITE_DB_URL,
  },
  verbose: true,
  strict: true,
})
