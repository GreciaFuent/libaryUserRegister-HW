import Book from "./book";

export default interface SeeBooks {
    find(): Promise<Array<Book>>;
}