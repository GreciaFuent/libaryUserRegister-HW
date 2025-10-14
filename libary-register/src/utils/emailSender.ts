import sendgrid from "@sendgrid/mail";

import { EmailCredentials } from "./credentials";
import NotificationSender from "./notificationSender";

export default class EmailSender implements NotificationSender{
    constructor() {
        sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");
    }
    async send(credentials: object) {
        const {email, name} = credentials as EmailCredentials;
        try {
            await sendgrid.send({
                to: email,
                from: "mayda.matul@gmail.com",
                subject: 'Confirmación de Usuario',
                html: `<h1>HCM-Library</h1>
                <p>Hola ${name}!!</p>
                <p>Tu usuario ha sido verificado</p>`,
            })

        return { success: true, message: "Email sent successfully" };
        } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
        }
    }

}