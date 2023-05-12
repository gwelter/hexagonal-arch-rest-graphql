import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import SearchBooks from "../../src/application/SearchBooks.ts";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase.ts";

const booksRepositoryDatabase = new BookRepositoryDatabase();

Deno.test("SearchBooks", async () => {
  const searchBooks = new SearchBooks(booksRepositoryDatabase);
  const output = await searchBooks.execute("Test Book");
  assertEquals(output[0].title, "Test Book");
});
