import Book from "./book";

export default interface BookRepository {
    find(): Array<Book>;
}