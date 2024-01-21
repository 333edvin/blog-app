import express from "express"
import dotenv from 'dotenv'
import morgan from "morgan"
import connectDB from "./config/db.js"
import uploadRoutes from './routes/uploadRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import postRoutes from './routes/postRoutes.js'
import cors from 'cors'
import path from 'path'
import {fileURLToPath} from 'url';

//config env
dotenv.config()

//datatbase config
connectDB();

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express()


//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))


//routes
app.use('/api/v1/upload',uploadRoutes)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/post',postRoutes)

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



//port
const PORT = process.env.PORT || 8080

//run
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

