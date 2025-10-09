import User from "./user";
import UserDto from "./user-dto";

export default interface UserUpdater {
    update(id: number, valid_status: boolean): Promise<UserDto>;
}