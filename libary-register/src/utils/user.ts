import UserEmail from "./user-email";
import UserDPI from "./user-dpi";
import UserPhoneNumber from "./user-phone-number";
import UserId from "./user-id";
import UserBirthDate from "./user-birthdate";
import UserName from "./user-name";
import UserPassword from "./user-password";


export default class User {
    private id: UserId;
    private name: UserName;
    private birthDate: UserBirthDate;
    private password: UserPassword;
    private dpi: UserDPI;
    private email: UserEmail;
    private phoneNum: UserPhoneNumber;

    constructor(
        id: UserId, 
        name: UserName,
        birthDate: UserBirthDate,
        password: UserPassword,
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
            new UserId(id), 
            new UserName(name), 
            new UserBirthDate(birthDate), 
            new UserPassword(password),
            new UserDPI(dpi),
            new UserEmail(email),
            new UserPhoneNumber(phoneNum)
        )
        return postUser;
    }

    public toPrimitives(){
    return {
        id: this.id.value,
        name: this.name.value,
        birthDate: this.birthDate.value,
        password: this.password.value,
        dpi: this.dpi.value,
        email: this.email.value,
        phoneNumber: this.phoneNum.value,
    };
  }

}