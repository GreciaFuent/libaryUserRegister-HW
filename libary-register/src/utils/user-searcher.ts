import UserRepository from "./user-repository";

// este es el caso de uso
export default class userSearcher {
    private readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async run(id: number): Promise<boolean> {
        const user = await this.repository.seeUserId(id);

        if (!user) {
        return false;
        }

        return true;
    }
}
