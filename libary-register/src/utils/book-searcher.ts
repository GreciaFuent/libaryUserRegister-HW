import BookRepository from "./book-repository";
import Book from "./book";
import { error } from "console";


export default class BookSearcher {
  constructor(
    private readonly repository: BookRepository,
  ) {}

  public async run (verifaction: boolean): Promise<Book[]> {
    
    if (verifaction === null) {
      throw new Error("User not found");
    }

    if (verifaction === false) {
      console.log("estoy entrando")
      throw new Error("User is not allowed to view books");
    }

    const books = await this.repository.find(); 
    return books;
  }
}
