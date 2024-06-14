import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"

import { userRouter } from "./users/user.routes"
import { productRouter } from "./products/product.routes"

dotenv.config()

if(!process.env.PORT) {
    console.log('No port value specified...')
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', userRouter)
app.use('/', productRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})