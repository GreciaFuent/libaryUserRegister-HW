

export default class UserPhoneNumber {

    public value: string

    constructor(value:string) {
        this.isValidPhoneNumber(value);
        this.value = value
    };

    private isValidPhoneNumber(phoneNumber:string): void{
        if (typeof phoneNumber !== "string" || phoneNumber.length < 8 || 
            phoneNumber.length > 12) {
            throw new Error("Invalid Phone Number");
        }
    };

}

