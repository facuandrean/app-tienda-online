import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
    url: process.env.URL_DB!,
    authToken: process.env.TOKEN_DB!
});

export const db = drizzle({ client });

