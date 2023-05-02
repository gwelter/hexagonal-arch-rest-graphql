drop table if exists author_book;
drop table if exists author;
drop table if exists book;

create table author (
	id_author integer primary key,
	name text
);

create table book (
	id_book integer primary key,
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

insert into author (id_author, name) values (1, 'J. K. Rowling');
insert into author (id_author, name) values (2, 'J. R. R. Tolkien');
insert into author (id_author, name) values (3, 'George R. R. Martin');

insert into book (id_book, title, price) values (1, 'Harry Potter and the Philosopher''s Stone', 1000);
insert into book (id_book, title, price) values (2, 'Harry Potter and the Chamber of Secrets', 1000);
insert into book (id_book, title, price) values (3, 'Harry Potter and the Prisoner of Azkaban', 1000);
insert into book (id_book, title, price) values (4, 'Harry Potter and the Goblet of Fire', 1000);
insert into book (id_book, title, price) values (5, 'Harry Potter and the Order of the Phoenix', 1000);
insert into book (id_book, title, price) values (6, 'Harry Potter and the Half-Blood Prince', 1000);
insert into book (id_book, title, price) values (7, 'Harry Potter and the Deathly Hallows', 1000);
insert into book (id_book, title, price) values (8, 'The Hobbit', 1000);
insert into book (id_book, title, price) values (9, 'The Fellowship of the Ring', 1000);
insert into book (id_book, title, price) values (10, 'The Two Towers', 1000);
insert into book (id_book, title, price) values (11, 'The Return of the King', 1000);
insert into book (id_book, title, price) values (12, 'A Game of Thrones', 1000);
insert into book (id_book, title, price) values (13, 'A Clash of Kings', 1000);
insert into book (id_book, title, price) values (14, 'A Storm of Swords', 1000);
insert into book (id_book, title, price) values (15, 'A Feast for Crows', 1000);
insert into book (id_book, title, price) values (16, 'A Dance with Dragons', 1000);
insert into book (id_book, title, price) values (17, 'The Winds of Winter', 1000);
insert into book (id_book, title, price) values (18, 'A Dream of Spring', 1000);

insert into author_book (id_author, id_book) values (1, 1);
insert into author_book (id_author, id_book) values (1, 2);
insert into author_book (id_author, id_book) values (1, 3);
insert into author_book (id_author, id_book) values (1, 4);
insert into author_book (id_author, id_book) values (1, 5);
insert into author_book (id_author, id_book) values (1, 6);
insert into author_book (id_author, id_book) values (1, 7);
insert into author_book (id_author, id_book) values (2, 8);
insert into author_book (id_author, id_book) values (2, 9);
insert into author_book (id_author, id_book) values (2, 10);
insert into author_book (id_author, id_book) values (2, 11);
insert into author_book (id_author, id_book) values (3, 12);
insert into author_book (id_author, id_book) values (3, 13);
insert into author_book (id_author, id_book) values (3, 14);
insert into author_book (id_author, id_book) values (3, 15);
insert into author_book (id_author, id_book) values (3, 16);
insert into author_book (id_author, id_book) values (3, 17);
insert into author_book (id_author, id_book) values (3, 18);
