

export default class UserEmail {

    public value: string

    constructor(value:string) {
        this.isValidEmail(value);
        this.value = value
    };

    private isValidEmail(email:string): void{
        if (typeof email !== "string" || !email.includes("@") || !email.includes(".")) {
            throw new Error("Invalid email");
        }
    };

}

