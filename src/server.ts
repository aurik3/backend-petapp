import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/db'




dotenv.config()
//DB connnection
connectDB()

//Init
const app = express()

//Intances
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())






export default app