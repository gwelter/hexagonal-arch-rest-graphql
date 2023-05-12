import Book from "../domain/entities/Book.ts";
import BookRepository from "../domain/repository/BookRepository.ts";

export default class SaveBooks {
  constructor(readonly booksRepositoryDatabase: BookRepository) {}

  async execute(input: Input): Promise<Book> {
    const idBook = crypto.randomUUID();
    const book = new Book(idBook, input.title, input.price);
    await this.booksRepositoryDatabase.save(book);

    return book;
  }
}

type Input = {
  title: string;
  price: number;
  id_author?: string;
  name_author?: string;
};
