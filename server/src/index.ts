import express from 'express'
import cors from 'cors'

import userRouter from './routes/router'

let app = express()
const port: number = 5001

app.use(cors())
app.use(express.json())

app.use("/api/v1",userRouter)

app.listen(port, ()=>{console.log("started listening")})
