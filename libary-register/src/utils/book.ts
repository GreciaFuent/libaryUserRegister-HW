export default class Book {
    public readonly name: string;
    public readonly datePublish: Date;
    public readonly author: string;

    constructor (
        name: string,
        datePublish: Date, 
        author: string
    ) {
        this.name = name
        this.datePublish = datePublish
        this.author = author
    }

}