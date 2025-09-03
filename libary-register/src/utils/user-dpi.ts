

export default class UserDPI {

    public value: string

    constructor(value:string) {
        this.isValidDPI(value);
        this.value = value
    };

    private isValidDPI(dpi:string): void{
        if (typeof dpi !== "string" || dpi.length !== 13) {
            throw new Error("Invalid DPI");
        }
    };

}

