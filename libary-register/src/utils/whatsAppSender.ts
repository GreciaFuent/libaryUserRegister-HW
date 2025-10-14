import axios from "axios";
import { WhatsAppCredentials } from "./credentials";
import NotificationSender from "./notificationSender";

export default class WhatsAppSender implements NotificationSender{

    public async send(credentials: object){
        const {phoneNumber, name} = credentials as WhatsAppCredentials;

        const instance = process.env.ULTRAMSG_INSTANCE!;
        const token = process.env.ULTRAMSG_TOKEN!;
        const url = `https://api.ultramsg.com/${instance}/messages/chat`;
        const text = `Hola ${name}, tu cuenta ha sido habilitada ;) jejeje ya anda jalando`;

        try {
            await axios.post(url, { token, to: phoneNumber, body: text });
            console.log(`WhatsApp enviado a ${phoneNumber}: ${text}`);
        } catch (error) {
            console.error(`Error enviando mensaje:`, error);
        }
    }
    
}
