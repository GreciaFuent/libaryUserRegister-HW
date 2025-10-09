import { EmailCredentials } from "./credentials";
import NotificationSender from "./notificationSender";

export default class EmailSender implements NotificationSender{

    send(credentials: object) {
        const {email, text} = credentials as EmailCredentials;

        return(`Email: ${email}, Text: ${text}.`)
    }

}