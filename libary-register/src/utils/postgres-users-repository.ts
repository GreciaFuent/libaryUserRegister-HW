import postgres, { Sql } from "postgres";
import UserUpdater from "./userUpdater";
import SeerUserId from "./seerUserId";
import UserSaver from "./userSaver";
import User from "./user";
import UserDto from "./user-dto";

export default class PostgresUserRepository implements UserUpdater, SeerUserId, UserSaver{
    private readonly sql: Sql;

    constructor () {
    const connectionString = 'postgresql://postgres.gekrcatdblzdopluwqba:Diferencias.645@aws-1-us-east-1.pooler.supabase.com:6543/postgres'
    this.sql = postgres(connectionString)
    }

    async save(user: User) {
        // funcion para guardar el User
        try {
            const dataPrimitive = user.toPrimitives();
            const name = dataPrimitive.name;
            const birthDate = dataPrimitive.birthDate;
            const password = dataPrimitive.password;
            const dpi = dataPrimitive.dpi;
            const email = dataPrimitive.email;
            const phoneNum = dataPrimitive.phoneNumber;
            const valid_status = false;

            await this.sql`INSERT INTO public.user (name, birthDate, password, dpi, email, phone_number, valid_status) 
            VALUES (${name},  ${birthDate}, ${password}, ${dpi}, ${email}, ${phoneNum}, ${valid_status});`
        } catch(error) {
            console.log("An error occurred while saving user data: ", error)
        }
    }

    async seeUserId(id: number): Promise<boolean | null> {
        // funcion para ver usuario por id
        try {
            const result = await this.sql`
                SELECT  valid_status FROM public.user WHERE id = ${id} LIMIT 1;`;
            console.log(result[0].valid_status)
            return result[0].valid_status

        } catch (error) {
            console.log("An error occurred while fetching user data: ", error);
            return null;
        }
    }

    async update(id: number): Promise<UserDto | null> {
    // funcion para actualizar valid_status = true
        try {
            const [rows] = await this.sql`
                UPDATE public.user
                SET valid_status = TRUE
                WHERE id = ${id} returning *;
            `;

            const user = User.create(
                parseInt(rows.id), 
                rows.name, 
                rows.birthdate, 
                rows.password, 
                rows.dpi, 
                rows.email, 
                rows.phone_number)
            
            const userDto = user.toPrimitives()
            return userDto

        } catch (error) {
            console.log("An error occurred while updating user data: ", error);
            return null;
        }
    }


}