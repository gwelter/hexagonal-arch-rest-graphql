import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";

async function main() {
	const typeDefs = `
		type Book {
			id: Int,
			title: String,
			price: Int,
			author: Author,
		}
		type Author {
			name: String
		}
		type Query {
			books (criteria: String): [Book]
		}
	`;

	const books = [
		{
			id: 1,
			title: "Harry Potter and the Chamber of Secrets",
			price: 200,
			author: {
				name: "J.K. Rowling",
			},
		},
		{
			id: 2,
			title: "Jurassic Park",
			price: 300,
			author: {
				name: "Michael Crichton",
			},
		},
	];

	const resolvers = {
		Query: {
			books(_: unknown, args: { criteria: string }) {
				if (!args.criteria) return books;

				return books.filter((book) => book.title.includes(args.criteria));
			},
		},
	};

	const server = new ApolloServer({ typeDefs, resolvers });
	const { url } = await startStandaloneServer(server, {
		listen: {
			port: 4000,
		},
	});
	console.log(`Server ready at ${url}`);
}

await main();
