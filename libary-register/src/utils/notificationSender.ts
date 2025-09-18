import UserDto from "./user-dto";

export default interface NotificationSender {
    send(user: UserDto | null): string
}