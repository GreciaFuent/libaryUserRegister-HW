import User from "./user";
import UserRepository from "./user-repository";

// este es el caso de uso
export default class userSearcher {
    private readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async run(id: number): Promise<boolean | null> {
        // Encargado de buscar un usuario por id
        const user = await this.repository.seeUsers(id);
        return user;
    }
}
