import BookRepository from "./book-repository";
import UserSeeUsers from "./see-users";
import Book from "./book";

export default class BookSearcher {
  private repository: BookRepository;
  private userSearcher: UserSeeUsers;

  constructor(repository: BookRepository, userSearcher: UserSeeUsers) {
    this.repository = repository;
    this.userSearcher = userSearcher;
  }

  public run(userId: number): Book[] {
    const user = this.userSearcher.run(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const books = this.repository.find();
    return books;
  }
}
