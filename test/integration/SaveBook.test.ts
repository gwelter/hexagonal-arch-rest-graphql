import SaveBooks from "../../src/application/SaveBooks.ts";
import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test("SaveBook", { ignore: false }, async () => {
  const saveBook = new SaveBooks();
  const output = await saveBook.execute({
    title: "Test book",
    price: 100,
    name_author: "Test Author",
  });

  assertEquals(output.price, 100);
});
