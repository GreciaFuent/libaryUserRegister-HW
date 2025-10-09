import User from "./user";
import UserDto from "./user-dto";

export default interface UserUpdater {
    update(user: User): void;
}