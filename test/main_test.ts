import { assert, assertArrayIncludes, assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test("Should test the presence of some arbitrary books", async function addTest() {
	const resp = await fetch("http://localhost:4000/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				{
					books {
						id
						title
					}
				}
      		`,
		}),
	});
	const { data } = await resp.json();
	assertArrayIncludes(data.books, [
		{ id: 1, title: "Harry Potter and the Chamber of Secrets" },
		{ id: 2, title: "Jurassic Park" },
	]);
});

Deno.test("Should fech a book by id", async function addTest() {
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
	assertEquals(data.books, [{ title: "Harry Potter and the Chamber of Secrets" }]);
});

Deno.test("Should save a book", async function addTest() {
	const resp = await fetch("http://localhost:4000/graphql", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
				mutation ($book: BookInput) {
					saveBook (book: $book) {
						id
						title
						price
						author {
							name
						}
					}
				}
			`,
			variables: {
				book: {
					title: "The Lord of the Rings",
					price: 100,
					authorName: "J.R.R. Tolkien",
				},
			},
		}),
	});
	const { data } = await resp.json();
	assert(data.saveBook.title === "The Lord of the Rings");
	assert(data.saveBook.price === 100);
});
