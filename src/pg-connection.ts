import { load } from "https://deno.land/std/dotenv/mod.ts";
import postgres from "https://deno.land/x/postgresjs@v3.3.4/mod.js";

const env = await load();

const username = env["POSTGRES_USER"];
const password = env["POSTGRES_PASSWORD"];
const database = env["POSTGRES_DB"];

const host = "localhost";
const port = "15432";

const connection = `postgres://${username}:${password}@${host}:${port}/${database}`;
console.log(connection);

export const sql = postgres(connection);

export async function getBooks() {
  const bookData = await sql`select * from book`;
  console.log(bookData);
}
