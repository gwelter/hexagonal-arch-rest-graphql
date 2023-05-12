import { connect } from "../../pg-connection.ts";

import Book from "../../domain/entities/Book.ts";
import BookRepository from "../../domain/repository/BookRepository.ts";
import Author from "../../domain/entities/Author.ts";

export default class BookRepositoryDatabase implements BookRepository {
  async search(criteria: string): Promise<Book[]> {
    const sql = connect();
    const whereTitle = sql`where title like ${"%" + criteria + "%"}`;
    const booksData = await sql`select * from book ${criteria ? whereTitle : sql``}`;
    const books: Book[] = [];

    for (const bookData of booksData) {
      const authorsData =
        await sql`select * from author_book join author using (id_author) where id_book = ${bookData.id_book}`;

      const book = new Book(bookData.id_book, bookData.title, bookData.price);
      for (const author of authorsData) {
        book.addAuthor(new Author(author.id_author, author.name));
      }
      books.push(book);
    }
    await sql.end();

    return books;
  }

  async save(book: Book): Promise<void> {
    const sql = connect();
    // let authorDatas = await sql`select * from author where id_author = ${book?.id_author || 0}`;
    // if (!authorDatas.length) {
    //   authorDatas = await sql`insert into author (name) values (${book.name_author || "Unknown Author"}) returning *`;
    // }
    await sql`insert into book (id_book, title, price) values(${book.id_book}, ${book.title}, ${book.price});`;

    await Promise.all(
      book.authors.map((author) =>
        sql`insert into author_book (id_author, id_book) values (${author.id_author}, ${book.id_book});`
      ),
    );

    await sql.end();
  }
}
