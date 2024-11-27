import express from "express"
import { Router, Request, Response } from "express"

const server = express()

const route = Router()

server.use(express.json())

route.get('/', (req: Request, res: Response ) => {
    res.json({message: 'Hello World!'})
})

server.use(route)

export default server
