export default class User {
    public id: any;
    public name: string;
    public birthDate: Date;
    public password: string;
    public dpi: string;
    public email: string;
    public phoneNum: string;

    constructor(
        id: number, 
        name: string,
        birthDate: Date,
        password: string,
        dpi: string,
        email: string,
        phoneNum: string,
        
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

        // return users;
    }

}