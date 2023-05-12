import Book from "../entities/Book.ts";

export default interface BookRepository {
  search(criteria: string): Promise<Book[]>;
  save(book: Book): Promise<void>;
}
