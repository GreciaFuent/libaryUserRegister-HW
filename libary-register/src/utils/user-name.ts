export default class UserName {
    public value: string;

    constructor(value: string) {
        this.isValid(value)
        this.value = value
    }

    private isValid(value: string) {
        if (typeof value !== 'string') {
            throw new Error("Invalid post format")
        }
    }
}