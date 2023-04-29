import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectmongo.js'
dotenv.config()
import web from './routes/web.js'

const app = express()

app.use(cors())
app.use(json())
app.use(express.urlencoded({extended:false}))

connectDB(process.env.DB_URL)

app.use("/", web)

app.listen(process.env.PORT, ()=>{
    console.log("running", process.env.PORT)
})