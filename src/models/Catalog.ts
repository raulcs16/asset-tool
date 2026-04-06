export type CategoryRow = {
  id: number;
  name: string;
};

export type AuthorRow = {
  id: number;
  name: string;
};

export type BookRow = {
  id: number;
  title: string;
  categoryId: number;
};

export type BookAuthorRow = {
  bookId: number;
  authorId: number;
};


export type BookDetailsDTO = {
  id: number;
  title: string;
  category: string;
  authors: string[];
};
