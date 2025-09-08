import { NextRequest, NextResponse } from "next/server";
import PostgresUserRepository from "@/utils/postgres-users-repository";
import UserSeeUsers from "@/utils/see-users";
import UserUpdate from "@/utils/user-update";


export async function GET(request: NextRequest, { params }: { params: { id: string } } ) {
    try {
        const id = Number(params.id);
        const repository = new PostgresUserRepository();
        const seeUser = new UserSeeUsers(repository);
        const user = await seeUser.run(id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
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

