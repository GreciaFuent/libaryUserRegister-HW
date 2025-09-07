import UserRepository from "./user-repository";

// este es el caso de uso
export default class UserUpdate {
    private readonly repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    public async run(id: number): Promise<void> {
        // Encargado de actualizar valid_status = true
        await this.repository.update(id);
    }
}
