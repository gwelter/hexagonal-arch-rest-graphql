import Book from "../domain/entities/Book.ts";
import BookRepository from "../domain/repository/BookRepository.ts";

export default class SeachBooks {
  constructor(readonly booksRepositoryDatabase: BookRepository) {}

  async execute(criteria: string): Promise<Book[]> {
    const books = await this.booksRepositoryDatabase.search(criteria);
    return books;
  }
}
