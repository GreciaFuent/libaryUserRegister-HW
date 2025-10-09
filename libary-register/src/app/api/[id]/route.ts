import { NextRequest, NextResponse } from "next/server";
import PostgresUserRepository from "@/utils/postgres-users-repository";
import userSearcher from "@/utils/user-searcher";
import UserUpdate from "@/utils/user-update";
import InMemoryBookRepository from "@/utils/in-memory-book-repository";
import BookSearcher from "@/utils/book-searcher";
import EmailSender from "@/utils/emailSender";
import WhatsAppSender from "@/utils/whatsAppSender";



export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    try {

        const id = Number(params.id);

        const userRepository = new PostgresUserRepository();
        const userSearcherFinal = new userSearcher(userRepository);
        const verification = await userSearcherFinal.run(id);

        const bookRepository = new InMemoryBookRepository();
        const bookSearcher = new BookSearcher(bookRepository);
        const books = await bookSearcher.run(verification);

        return NextResponse.json(books);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'No tiene acceso'}, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const repository = new PostgresUserRepository();
        //const sender = new EmailSender();
        const sender = new WhatsAppSender();
        const updater = new UserUpdate(repository, sender);
        await updater.run(id);

        return NextResponse.json({ message: `User with id=${id} updated successfully` });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update data' }, { status: 500 });
    }
}

