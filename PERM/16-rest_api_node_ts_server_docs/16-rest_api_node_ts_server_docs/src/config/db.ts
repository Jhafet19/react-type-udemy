import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize('administradro_productos', 'root', 'root', {
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    models: [__dirname + '/../models/**/*'],
    logging: false
})

export default db