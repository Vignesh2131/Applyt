import express, { type Express } from "express"
import "dotenv/config";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { authRouter } from "./routes/auth.routes.js";
import { jobRouter } from "./routes/job.routes.js"

const app: Express = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(authRouter)
app.use(jobRouter)
app.get("/", (req, res) => { 
    res.send("Hello world")
})

app.listen(8080, () => { 
    console.log("Server started at 3000")
})
