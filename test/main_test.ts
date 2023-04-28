import { assertArrayIncludes, assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";

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
			{
				books (criteria: "Secrets") {
					title
				}
			}
	  `,
		}),
	});
	const { data } = await resp.json();
	assertEquals(data.books, [{ title: "Harry Potter and the Chamber of Secrets" }]);
});
