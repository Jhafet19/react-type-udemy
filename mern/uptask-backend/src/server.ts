import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from "./config/db";
import prpjectRputes from './routes/projectRoutes'
import { corsConfig } from "./config/cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";

dotenv.config()

connectDB()
const app = express()
app.use(cors(corsConfig))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/projects', prpjectRputes)

export default app;