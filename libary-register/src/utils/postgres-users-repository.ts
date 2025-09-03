import postgres, { Sql } from "postgres";
import UserRepository from "./user-repository";
import User from "./user";

export default class PostgresUserRepository implements UserRepository{
    private readonly sql: Sql;

    constructor () {
    const connectionString = 'postgresql://postgres.gekrcatdblzdopluwqba:Diferencias.645@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
    this.sql = postgres(connectionString)
    }

    async save(user: User) {
        // funcion para guardar el User
        try {
            const name = user.name;
            const birthDate = user.birthDate;
            const password = user.password;
            const dpi = user.dpi.value;
            const email = user.email.value;
            const phoneNum = user.phoneNum.value;
            const valid_status = false;

            await this.sql`INSERT INTO public.user (name, birthDate, password, dpi, email, phone_number, valid_status) 
            VALUES (${name},  ${birthDate}, ${password}, ${dpi}, ${email}, ${phoneNum}, ${valid_status});`
        } catch(error) {
            console.log("An error occurred while saving user data: ", error)
        }
    }

    async seePost() {
        // funcion para ver usuarios
    }

    async updatePost(user: User) {
        // funcion para modificar post
    }


}