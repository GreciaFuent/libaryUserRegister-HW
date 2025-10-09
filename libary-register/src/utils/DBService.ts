import User from "./user";
import UserDto from "./user-dto";

export default interface DBService {
    save(user: User): void
    seeUserId(id: number): Promise<boolean>
    update(id: number, valid_status: boolean): Promise<UserDto>
}