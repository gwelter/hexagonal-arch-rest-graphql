import { load } from "https://deno.land/std@0.185.0/dotenv/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.3.4/mod.js";

const env = await load();

const username = env["POSTGRES_USER"];
const password = env["POSTGRES_PASSWORD"];
const database = env["POSTGRES_DB"];

const host = "localhost";
const port = "15432";

const connection = `postgres://${username}:${password}@${host}:${port}/${database}`;

export function connect() {
  return postgres(connection);
}
