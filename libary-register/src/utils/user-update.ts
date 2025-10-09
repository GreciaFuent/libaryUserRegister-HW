import NotificationSender from "./notificationSender";
import User from "./user";
import UserDto from "./user-dto";
import UserUpdater from "./userUpdater";

// este es el caso de uso
export default class UserUpdate {
    private readonly repository: UserUpdater;
    private sender: NotificationSender;

    constructor(repository: UserUpdater,  sender: NotificationSender) {
        this.repository = repository;
        this.sender = sender
    }

        public async run(id: number, valid_status?: boolean): Promise<UserDto> {
        // Encargado de actualizar valid_status = true
        const user = await this.repository.update(id, valid_status ?? true);
        console.log(this.sender.send(!user));
        return user;
    }
}



