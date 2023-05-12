import Author from "./Author.ts";

export default class Book {
  authors: Author[] = [];
  constructor(readonly id_book: string, readonly title: string, readonly price: number) {
  }

  addAuthor(author: Author) {
    this.authors.push(author);
  }
}
