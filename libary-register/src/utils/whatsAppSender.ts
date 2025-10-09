import { WhatsAppCredentials } from "./credentials";
import NotificationSender from "./notificationSender";

export default class WhatsAppSender implements NotificationSender{

    public send(credentials: object){
        const {phoneNumber, text} = credentials as WhatsAppCredentials;

        return(`Phone: ${phoneNumber}. Text: ${text}.`)
    }

}
