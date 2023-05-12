import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import SeachBooks from "./application/SearchBooks.ts";
import SaveBooks from "./application/SaveBooks.ts";
import BookRepositoryDatabase from "./infra/repository/BookRepositoryDatabase.ts";

type BookInput = {
  title: string;
  price: number;
  id_author?: string;
  name_author?: string;
};

async function main() {
  const typeDefs = `
		type Book {
			id_book: String,
			title: String,
			price: Int,
			authors: [Author],
		}
		type Author {
      id_author: String,
			name: String
		}
		
		type Query {
			books (criteria: String): [Book]
		}
		
		input BookInput {
      title: String,
			price: Int,
			id_author: String,
      name_author: String
		}
		type Mutation {
			saveBook (book: BookInput): Book
		}
	`;

  const booksRepositoryDatabase = new BookRepositoryDatabase();

  const resolvers = {
    Query: {
      async books(_: unknown, args: { criteria: string }) {
        const seachBooks = new SeachBooks(booksRepositoryDatabase);
        const books = await seachBooks.execute(args.criteria);
        return books;
      },
    },
    Mutation: {
      async saveBook(_: unknown, args: { book: BookInput }) {
        const saveBooks = new SaveBooks(booksRepositoryDatabase);
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
