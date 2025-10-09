import NotificationSender from "./notificationSender";
import User from "./user";
import UserUpdater from "./userUpdater";

// este es el caso de uso
export default class UserUpdate {
    private readonly repository: UserUpdater;
    private sender: NotificationSender;

    constructor(repository: UserUpdater,  sender: NotificationSender) {
        this.repository = repository;
        this.sender = sender
    }

    public async run(user: User): Promise<void> {
        // Encargado de actualizar valid_status = true
        await this.repository.update(user);
        console.log(this.sender.send(user));
    }
}


