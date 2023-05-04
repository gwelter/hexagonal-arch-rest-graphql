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
        const whereTitle = sql`where title like ${"%" + args.criteria + "%"}`;
        const booksData = await sql`select * from book ${args.criteria ? whereTitle : sql``}`;
        const books: Book[] = [];

        for (const book of booksData) {
          const authorsData =
            await sql`select * from author_book join author using (id_author) where id_book = ${book.id_book}`;

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
        let authorDatas = await sql`select * from author where id_author = ${args.book?.id_author || 0}`;
        if (!authorDatas.length) {
          authorDatas = await sql`insert into author (name) values (${
            args.book.name_author || "Unknown Author"
          }) returning *`;
        }
        const bookData =
          await sql`insert into book (title, price) values(${args.book.title}, ${args.book.price}) returning *`;

        await sql`insert into author_book (id_author, id_book) values (${authorDatas[0].id_author}, ${
          bookData[0].id_book
        })`;
        const book: Book = {
          id_book: bookData[0].id_book,
          title: bookData[0].title,
          price: bookData[0].price,
          authors: authorDatas.map((authorData) => ({
            id_author: authorData.id_author,
            name: authorData.name,
          })),
        };
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
