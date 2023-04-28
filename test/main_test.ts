import { assertArrayIncludes } from "https://deno.land/std@0.184.0/testing/asserts.ts";

Deno.test(async function addTest() {
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
	console.log(data);
	assertArrayIncludes(data.books, [{ id: 1, title: "Harry Potter and the Chamber of Secrets" }]);
});
