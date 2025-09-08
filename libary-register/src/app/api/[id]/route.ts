import { NextRequest, NextResponse } from "next/server";
import PostgresUserRepository from "@/utils/postgres-users-repository";
import userSearcher from "@/utils/user-searcher";
import UserUpdate from "@/utils/user-update";
import InMemoryBookRepository from "@/utils/in-memory-book-repository";
import BookSearcher from "@/utils/book-searcher";



export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    try {
        // creacion del UserRepo y el userSearcher
        const id = await  Number(params.id);
        const repository = new PostgresUserRepository();
        const seeUser = new userSearcher(repository);

        // creacion de bookRepo y del bookSearcher
        const bookRepository = new InMemoryBookRepository();
        const bookSearcher = new BookSearcher(bookRepository, seeUser);
        const books = await bookSearcher.run(id);

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
        const updater = new UserUpdate(repository);
        await updater.run(id);

        return NextResponse.json({ message: `User with id=${id} updated successfully` });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update data' }, { status: 500 });
    }
}

