import User from "./user";

export default interface UserSaver {
    save(user: User): Promise<void>;
}