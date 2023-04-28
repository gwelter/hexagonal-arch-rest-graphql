drop table if exists author;
drop table if exists book;

create table book (
	id_book integer primary key,
	title text,
	price integer not null
);

create table author (
	id_author integer primary key,
	name text,
	id_book integer not null,
	foreign key (id_book) references book(id_book));

insert into book (id_book, title, price) values (1, 'Harry Potter and the Philosopher''s Stone', 1000);
insert into author (id_author, name, id_book) values (1, 'J. K. Rowling', 1);
