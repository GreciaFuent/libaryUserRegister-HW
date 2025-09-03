import User from "./user";
import UserRepository from "./user-repository";



// este es el caso de uso
export default class UserRegister {

    private readonly repository: UserRepository;

    constructor(repository: UserRepository){
        this.repository = repository
    }

    public async run(id: number, name: string, birthDate: Date, password: string, dpi: string, email: string, phoneNum: string) {
        // Encargado de validar datos y guardar en base de datos
        const postUser = User.create(id, name, birthDate, password, dpi, email, phoneNum);
        await this.repository.save(postUser);
    }

}
