import User from "./user";

export default interface UserRepository {
    // es la interface donde promete que tiene que usar las fuciones
    // de save, update, seeUsers
    save(user: User): Promise<void>;
}