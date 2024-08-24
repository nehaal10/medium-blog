import express from 'express'
import cors from 'cors'

import userRouter from './routes/router'

let app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/v1",userRouter)
