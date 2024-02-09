import { v2 as cloudinary } from "cloudinary"
import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express, { Request, Response } from "express"
import path from "path"
import authRoutes from "./routes/auth.routes"
import hotelRoutes from "./routes/hotels.routes"
import userRoutes from "./routes/users.routes"
require("./db/mongodb")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

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

// added dist client folder so only backend can be deployed

app.use(express.static(path.join(__dirname, "../../client/dist")))

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/hotels", hotelRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"))
})

const PORT = 7001

app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})
