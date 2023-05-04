drop table if exists author_book;
drop table if exists author;
drop table if exists book;

create table author (
	id_author serial primary key,
	name text
);

create table book (
	id_book serial primary key,
	title text,
	price integer not null
);

create table author_book (
  id_author integer not null,
  id_book integer not null,
  primary key (id_author, id_book),
  foreign key (id_author) references author(id_author),
  foreign key (id_book) references book(id_book)
);

-- Rowling
insert into author (name) values ('J. K. Rowling');
insert into book (title, price) values ('Harry Potter and the Philosopher''s Stone', 1000);
insert into book (title, price) values ('Harry Potter and the Chamber of Secrets', 1000);
insert into book (title, price) values ('Harry Potter and the Prisoner of Azkaban', 1000);
insert into book (title, price) values ('Harry Potter and the Goblet of Fire', 1000);
insert into book (title, price) values ('Harry Potter and the Order of the Phoenix', 1000);
insert into book (title, price) values ('Harry Potter and the Half-Blood Prince', 1000);
insert into book (title, price) values ('Harry Potter and the Deathly Hallows', 1000);
insert into author_book (id_author, id_book) values (1, 1);
insert into author_book (id_author, id_book) values (1, 2);
insert into author_book (id_author, id_book) values (1, 3);
insert into author_book (id_author, id_book) values (1, 4);
insert into author_book (id_author, id_book) values (1, 5);
insert into author_book (id_author, id_book) values (1, 6);
insert into author_book (id_author, id_book) values (1, 7);

-- Tolkien
insert into author (id_author, name) values (2, 'J. R. R. Tolkien');
insert into book (title, price) values ('The Hobbit', 1000);
insert into book (title, price) values ('The Fellowship of the Ring', 1000);
insert into book (title, price) values ('The Two Towers', 1000);
insert into book (title, price) values ('The Return of the King', 1000);
insert into author_book (id_author, id_book) values (2, 8);
insert into author_book (id_author, id_book) values (2, 9);
insert into author_book (id_author, id_book) values (2, 10);
insert into author_book (id_author, id_book) values (2, 11);

-- Martin
insert into author (id_author, name) values (3, 'George R. R. Martin');
insert into book (title, price) values ('A Game of Thrones', 1000);
insert into book (title, price) values ('A Clash of Kings', 1000);
insert into book (title, price) values ('A Storm of Swords', 1000);
insert into book (title, price) values ('A Feast for Crows', 1000);
insert into book (title, price) values ('A Dance with Dragons', 1000);
insert into book (title, price) values ('The Winds of Winter', 1000);
insert into book (title, price) values ('A Dream of Spring', 1000);
insert into author_book (id_author, id_book) values (3, 12);
insert into author_book (id_author, id_book) values (3, 13);
insert into author_book (id_author, id_book) values (3, 14);
insert into author_book (id_author, id_book) values (3, 15);
insert into author_book (id_author, id_book) values (3, 16);
insert into author_book (id_author, id_book) values (3, 17);
insert into author_book (id_author, id_book) values (3, 18);
