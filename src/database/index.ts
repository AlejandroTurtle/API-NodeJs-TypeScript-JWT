import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    entities: ["./src/entities/*.ts"],
    migrations: ["./src/database/migrations/*.ts"],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source Incicializado!")
    })
    .catch((err) => {
        console.error(err)
    })