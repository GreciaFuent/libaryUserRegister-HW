import BookRepository from "./book-repository";

export default class BookSearcher {
    private repository: BookRepository;
    
    constructor(repository: BookRepository) {
        this.repository = repository
    }
    // falta implementar lo del userSearcherId
}