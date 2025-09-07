import { NextRequest, NextResponse } from "next/server";
import PostgresUserRepository from "@/utils/postgres-users-repository";
import postgres from "postgres";
import UserRegister from "@/utils/user-register";




export async function POST(request:NextRequest){
    // aqui se tiene que hacer la conexion con el postgres repository 

    try {
        const data = await request.json()
        const repository = new PostgresUserRepository();
        const register = new UserRegister(repository)
        await register.run(data.id, data.name, new Date(data.birthDate), data.password, data.dpi, data.email, data.phoneNum);

        return NextResponse.json({
            message: 'Data saved successfully in User table'
        })
    } catch (error) {
        console.error('Error saving data:', error);
        return NextResponse.json({
            message: 'Failed to save data'
        }, {status:500})
    }

}