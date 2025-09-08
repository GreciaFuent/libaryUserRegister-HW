import BookRepository from "./book-repository";
import UserSearcher from "./user-searcher";
import Book from "./book";
import { error } from "console";


export default class BookSearcher {
  constructor(
    private readonly repository: BookRepository,
    private readonly userSearcher: UserSearcher
  ) {}

  public async run(userId: number): Promise<Book[]> {
    const isValidOrNull = await this.userSearcher.run(userId); 

    if (isValidOrNull === null) {
      throw new Error("User not found");
    }

    if (isValidOrNull === false) {
      console.log("estoy entrando")
      throw new Error("User is not allowed to view books");
    }

    const books = await this.repository.find(); 
    return books;
  }
}
