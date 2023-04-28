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
			books: [Book]
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
	];

	const resolvers = {
		Query: { books: () => books },
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
