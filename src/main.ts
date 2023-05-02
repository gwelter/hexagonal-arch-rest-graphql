import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { sql } from "./pg-connection.ts";

type Author = {
  id_author: number;
  name: string;
};

type Book = {
  id_book: number;
  title: string;
  price: number;
  authors: Author[];
};
type BookInput = {
  id_book: number;
  title: string;
  price: number;
  id_author: number;
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
      id_book: Int,
			title: String,
			price: Int,
			id_author: Int,	
		}
		type Mutation {
			saveBook (book: BookInput): Book
		}
	`;

  const resolvers = {
    Query: {
      async books(_: unknown, args: { criteria: string }) {
        const whereTitle = sql`where title like ${"%" + args.criteria + "%"}`;
        const booksData = await sql`select * from book ${args.criteria ? whereTitle : sql``}`;
        const books: Book[] = [];

        for (const book of booksData) {
          const authorsData =
            await sql`select * from author_book join author using (id_author) where id_book = ${book.id_book}`;
          console.log({ authorsData });

          const authors = [];
          for (const author of authorsData) {
            authors.push({
              id_author: author.id_author,
              name: author.name,
            });
          }
          books.push({
            id_book: book.id_book,
            title: book.title,
            price: book.price,
            authors,
          });
        }

        return books;
      },
    },
    Mutation: {
      async saveBook(_: unknown, args: { book: BookInput }) {
        const book = await sql`insert into book (id_book, title, price, id_author) values
          (${args.book.id_book}, ${args.book.title}, ${+args.book.price}, ${+args.book.id_author}) returning *`;
        return book[0];
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
