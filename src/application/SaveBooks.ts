import { sql } from "../pg-connection.ts";

export default class SaveBooks {
  async execute(input: Input): Promise<Output> {
    let authorDatas = await sql`select * from author where id_author = ${input?.id_author || 0}`;
    if (!authorDatas.length) {
      authorDatas = await sql`insert into author (name) values (${input.name_author || "Unknown Author"}) returning *`;
    }
    const bookData = await sql`insert into book (title, price) values(${input.title}, ${input.price}) returning *`;

    await sql`insert into author_book (id_author, id_book) values (${authorDatas[0].id_author}, ${
      bookData[0].id_book
    })`;
    const book: Output = {
      id_book: bookData[0].id_book,
      title: bookData[0].title,
      price: bookData[0].price,
      authors: authorDatas.map((authorData) => ({
        id_author: authorData.id_author,
        name: authorData.name,
      })),
    };

    return book;
  }
}

type Input = {
  title: string;
  price: number;
  id_author?: number;
  name_author?: string;
};

type Output = {
  id_book: number;
  title: string;
  price: number;
  authors: {
    id_author: number;
    name: string;
  }[];
};
