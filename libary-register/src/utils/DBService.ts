import User from "./user";

export default interface DBService {
    save(user: User): void
    seeUserId(id: number): Promise<boolean>
    update(user: User): void
}