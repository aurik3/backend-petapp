import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/db'


//IMPORT ROUTES
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import petRoutes from './routes/petRoutes'
import clinicalRoutes from './routes/clinicalRoutes'




dotenv.config()
//DB connnection
connectDB()

//Init
const app = express()


//Intances
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())




app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use ('/api/v1/pets', petRoutes)
app.use ('/api/v1/clinical', clinicalRoutes)

export default app