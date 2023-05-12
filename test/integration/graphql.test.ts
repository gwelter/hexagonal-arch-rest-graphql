import { assert, assertArrayIncludes } from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test("Should test the presence of some arbitrary books", async () => {
  const resp = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
				{
					books {
						id_book
						title
					}
				}
      		`,
    }),
  });
  const { data } = await resp.json();
  assertArrayIncludes(data.books, [
    { id_book: "1", title: "Harry Potter and the Philosopher's Stone" },
    { id_book: "2", title: "Harry Potter and the Chamber of Secrets" },
  ]);
});

Deno.test("Should fech a book by id", async () => {
  const resp = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
				query ($criteria: String) {
					books (criteria: $criteria) {
						title
					}
				}
			`,
      variables: {
        criteria: "Secrets",
      },
    }),
  });
  const { data } = await resp.json();
  assert(data.books.length === 1);
  assert(data.books[0].title, "Harry Potter and the Chamber of Secrets");
});

Deno.test("Should save a book", async () => {
  const resp = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
				mutation ($book: BookInput) {
					saveBook (book: $book) {
						title
						price
					}
				}
			`,
      variables: {
        book: {
          title: "Test Book",
          price: 100,
          name_author: "Test author",
        },
      },
    }),
  });
  const { data } = await resp.json();
  assert(data.saveBook.title === "Test Book");
  assert(data.saveBook.price === 100);
});
