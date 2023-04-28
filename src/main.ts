import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";

type Author = {
	name: string;
};

type Book = {
	id: number;
	title: string;
	price: number;
	author: Author;
};
type BookInput = {
	title: string;
	price: number;
	authorName: string;
};

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
		
		input BookInput {
			title: String,
			price: Int,
			authorName: String,	
		}
		type Mutation {
			saveBook (book: BookInput): Book
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
		{
			id: 3,
			title: "The Lord of the Rings",
			price: 400,
			author: {
				name: "J.R.R. Tolkien",
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
		Mutation: {
			saveBook(_: unknown, args: { book: BookInput }): Book {
				const book: Book = {
					id: books.length + 1,
					title: args.book.title,
					price: args.book.price,
					author: {
						name: args.book.authorName,
					},
				};
				books.push(book);
				return book;
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
