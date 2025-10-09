import Book from "./book";
import BookRepository from "./seeBooks";

export default class InMemoryBookRepository implements BookRepository {
  private books: Promise<Array<Book>>;

  constructor(books?: Book[]) {
    this.books = Promise.resolve(
      books ?? [
        new Book("Carlos el Blanco", new Date("2005-01-16"), "Grecia Fuentes"),
        new Book("La tragica first date", new Date("2023-05-30"), "Mayda Matul"),
        new Book("La maravillas de los callejones", new Date("2015-05-30"), "Josue Bautista"),
      ]
    );
  }

  public find(): Promise<Array<Book>> {
    return this.books;
  }
}
