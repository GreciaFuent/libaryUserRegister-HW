import postgres, { Sql } from "postgres";
import UserRepository from "./user-repository";
import User from "./user";

export default class PostgresUserRepository implements UserRepository{
    private readonly sql: Sql;

    constructor () {
        // const connectionString = poner la conexcion con la base de datos
        // this.sql = postgres(connectionString)
    }

    async save(user: User) {
        // funcion para guardar el User
    }

    async seePost() {
        // funcion para ver usuarios
    }

    async updatePost(user: User) {
        // funcion para modificar post
    }


}