import UserEmail from "./user-email";
import UserDPI from "./user-dpi";
import UserPhoneNumber from "./user-phone-number";




export default class User {
    public id: any;
    public name: string;
    public birthDate: Date;
    public password: string;
    public dpi: UserDPI;
    public email: UserEmail;
    public phoneNum: UserPhoneNumber;

    constructor(
        id: number, 
        name: string,
        birthDate: Date,
        password: string,
        dpi: UserDPI,
        email: UserEmail,
        phoneNum: UserPhoneNumber,
        
    ) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate
        this.password = password
        this.dpi = dpi
        this.email = email
        this.phoneNum = phoneNum
    }

    public static create(id: number, name: string, birthDate: Date, password: string, dpi: string, email: string, phoneNum: string): User {
        // se tiene que llamar a la funcion de crear
        const postUser = new User (
            id, name, birthDate, password, new UserDPI(dpi), new UserEmail(email), new UserPhoneNumber(phoneNum)
        )
        return postUser;
    }

}