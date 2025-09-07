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

    async seeUsers(id: number): Promise<User | null> {
        // funcion para ver usuario por id
        try {
            const result = await this.sql`
                SELECT id, name, birthDate, password, dpi, email, phone_number, valid_status
                FROM public.user
                WHERE id = ${id}
                LIMIT 1;
            `;

            if (result.length === 0) return null;

            const r = result[0];
            return User.create(
                r.id,
                r.name,
                new Date(r.birthDate),
                r.password,
                r.dpi,
                r.email,
                r.phone_number
            );
        } catch (error) {
            console.log("An error occurred while fetching user data: ", error);
            return null;
        }
    }

    async update(id: number): Promise<void> {
    // funcion para actualizar valid_status = true
        try {
        await this.sql`
            UPDATE public.user
            SET valid_status = TRUE
            WHERE id = ${id};
        `;
        } catch (error) {
        console.log("An error occurred while updating user data: ", error);
        }
    }


}