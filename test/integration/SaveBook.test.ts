import SaveBooks from "../../src/application/SaveBooks.ts";
import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase.ts";

const booksRepositoryDatabase = new BookRepositoryDatabase();

Deno.test("SaveBook", async () => {
  const saveBook = new SaveBooks(booksRepositoryDatabase);
  const output = await saveBook.execute({
    title: "Test book",
    price: 100,
    name_author: "Test Author",
  });

  assertEquals(output.price, 100);
});
