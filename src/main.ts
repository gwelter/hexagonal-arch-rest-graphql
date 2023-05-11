import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import SeachBooks from "./application/SearchBooks.ts";
import SaveBooks from "./application/SaveBooks.ts";

type BookInput = {
  title: string;
  price: number;
  id_author?: number;
  name_author?: string;
};

async function main() {
  const typeDefs = `
		type Book {
			id_book: Int,
			title: String,
			price: Int,
			authors: [Author],
		}
		type Author {
      id_author: Int,
			name: String
		}
		
		type Query {
			books (criteria: String): [Book]
		}
		
		input BookInput {
      title: String,
			price: Int,
			id_author: Int,
      name_author: String
		}
		type Mutation {
			saveBook (book: BookInput): Book
		}
	`;

  const resolvers = {
    Query: {
      async books(_: unknown, args: { criteria: string }) {
        const seachBooks = new SeachBooks();
        const books = await seachBooks.execute(args.criteria);
        return books;
      },
    },
    Mutation: {
      async saveBook(_: unknown, args: { book: BookInput }) {
        const saveBooks = new SaveBooks();
        const book = await saveBooks.execute(args.book);
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
