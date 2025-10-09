import UserDto from "./user-dto";

export default interface UserUpdater {
    update(id: number): Promise<UserDto | null>;
}