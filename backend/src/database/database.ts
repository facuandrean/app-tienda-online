import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import config from "../config";

const client = createClient({
  url: config.libsql as string,
  authToken: config.tokenDB as string
});

export const db = drizzle({ client });

