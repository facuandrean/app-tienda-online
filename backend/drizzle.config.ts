import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/database/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.URL_DB as string,
    authToken: process.env.TOKEN_DB as string,
  },
});

