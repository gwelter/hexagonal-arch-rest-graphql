import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import SearchBooks from "../../src/application/SearchBooks.ts";

Deno.test("SearchBooks", async () => {
  const searchBooks = new SearchBooks();
  const output = await searchBooks.execute("Test book");
  assertEquals(output[0].title, "Test book");
});
