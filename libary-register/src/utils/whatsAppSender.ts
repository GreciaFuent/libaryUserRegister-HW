import NotificationSender from "./notificationSender";
import UserDto from "./user-dto";

export default class WhatsAppSender implements NotificationSender{
    constructor (){
    }

    public send(user: UserDto): string{
        return  "Enviando mensaje ddesde WhatsAppSender desde: " + user.phoneNumber
    }

}
