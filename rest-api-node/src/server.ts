import express from 'express';
import router from './router';
import db from './config/db';
import colors from "colors";

export async function connectDB() {
    try {

        await db.authenticate()
        db.sync()
        // console.log(colors.green('Conexion exitosa'));

    } catch (error) {
        // console.log("🚀 ~ connectDB ~ error:", error)
        // console.log(colors.red('Hubo un error en la base de datos'))
    }
}

connectDB()
const server = express()
server.use(express.json())

server.use('/api', router)

server.get('/api2', (req, res) => {
    res.json({ msg: "Desde API" })
})
export default server