import NotificationSender from "./notificationSender";
import UserUpdater from "./userUpdater";

// este es el caso de uso
export default class UserUpdate {
    private readonly repository: UserUpdater;
    private sender: NotificationSender;

    constructor(repository: UserUpdater,  sender: NotificationSender) {
        this.repository = repository;
        this.sender = sender
    }

    public async run(id: number): Promise<void> {
        // Encargado de actualizar valid_status = true
        const user = await this.repository.update(id);
        console.log(this.sender.send(!user))
    }
}
