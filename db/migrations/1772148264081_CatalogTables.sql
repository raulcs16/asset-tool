-- Up Migration
BEGIN;

CREATE TABLE category(
 id SERIAL PRIMARY KEY,
 name varchar(255) NOT NULL
);
CREATE TABLE author(
   id SERIAL PRIMARY KEY,
   name varchar(255) NOT NULL
);
CREATE TABLE  book(
  id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  category_id INT REFERENCES category(id) ON DELETE SET NULL
);
CREATE TABLE book_author(
    book_id INT REFERENCES book(id) ON DELETE CASCADE,
    author_id INT REFERENCES author(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id,author_id)
);

COMMIT;


-- Down Migration

BEGIN;

DROP TABLE IF EXISTS book_author;
DROP TABLE IF EXISTS book;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS category;