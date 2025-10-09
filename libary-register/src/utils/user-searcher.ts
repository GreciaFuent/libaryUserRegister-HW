import SeerUserId from "./seerUserId";

// este es el caso de uso
export default class userSearcher {
    private readonly repository: SeerUserId;

    constructor(repository: SeerUserId) {
        this.repository = repository;
    }

    public async run(id: number): Promise<boolean | null> {
        // Encargado de buscar un usuario por id
        const user = await this.repository.seeUserId(id);
        return user;
    }
}
