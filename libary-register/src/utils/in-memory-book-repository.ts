import Book from "./book";
import BookRepository from "./book-repository";

export default class InMemoryBookRepository implements BookRepository {
  private books: Book[] = [];

  constructor(books?: Book[]) {
    this.books = books ?? [
        new Book("Carlos el Blanco", new Date("2005-01-16"), "Grecia Fuentes"),
        new Book("La tragica first date", new Date("2023-05-30"), "Mayda Matul"),
        new Book("La maravillas de los callejones", new Date("2015-05-30"), "Josue Bautista"),
    ];
  }

  public find(): Book[] {
    return this.books;
  }
}
