import { NextRequest, NextResponse } from "next/server";
import PostgresUserRepository from "@/utils/postgres-users-repository";
import userSearcher from "@/utils/user-searcher";
import UserUpdate from "@/utils/user-update";
import InMemoryBookRepository from "@/utils/in-memory-book-repository";
import BookSearcher from "@/utils/book-searcher";
import EmailSender from "@/utils/emailSender";
import WhatsAppSender from "@/utils/whatsAppSender";
import User from "@/utils/user";


export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    try {

        const { id } = await params;
        const numId = Number(id);

        const userRepository = new PostgresUserRepository();
        const userSearcherFinal = new userSearcher(userRepository);
        const verification = await userSearcherFinal.run(numId);

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
    const { id } = await params;
    const numId = Number(id);
    const tipo = request.nextUrl.searchParams.get("tipo");

    const repository = new PostgresUserRepository();
    const sender = tipo === "email" ? new EmailSender() : new WhatsAppSender();
    const updater = new UserUpdate(repository, sender);

    await updater.run(numId);

    return NextResponse.json({
      message: `User ${id} updated successfully via ${tipo || "whatsapp"}`,
    });
  } catch (error) {
    console.error("Error en PATCH:", error);
    return NextResponse.json({ message: "Failed to update data" }, { status: 500 });
  }
}

