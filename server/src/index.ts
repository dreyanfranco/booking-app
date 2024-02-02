import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'hello from express' })
})
const PORT = 7001
app.listen(PORT, () => {
    console.log(`server running on localhost:${PORT}`)
})
