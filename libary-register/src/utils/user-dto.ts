export default class UserDto {
    public id: number;
    public name: string;
    public password: string;
    public birthDate: Date;
    public email: string;
    public dpi: string;
    public phoneNumber: string;

    constructor(
        id: number,
        name: string,
        password: string,
        birthDate: Date,
        email: string,
        dpi: string,
        phoneNumber: string
    ) {
        this.id = id
        this.name = name
        this.password = password
        this.birthDate = birthDate
        this.email = email
        this.dpi = dpi
        this.phoneNumber = phoneNumber
    }


}