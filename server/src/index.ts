import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { Request, Response } from "express"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/users.routes"
require("./db/mongodb")

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
)

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

const PORT = 7001

app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})
