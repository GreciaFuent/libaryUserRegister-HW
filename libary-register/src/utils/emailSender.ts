import NotificationSender from "./notificationSender";
import UserDto from "./user-dto";

export default class EmailSender implements NotificationSender{
    constructor(){

    }
    public send(user: UserDto): string {
        return "Enviando mensaje desde Email desde: " + user.email
    }

}