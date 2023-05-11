import { sql } from "../pg-connection.ts";

export default class SeachBooks {
  async execute(criteria: string): Promise<Output[]> {
    const whereTitle = sql`where title like ${"%" + criteria + "%"}`;
    const booksData = await sql`select * from book ${criteria ? whereTitle : sql``}`;
    const books: Output[] = [];

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
  }
}

type Output = {
  id_book: number;
  title: string;
  price: number;
  authors: {
    id_author: number;
    name: string;
  }[];
};
