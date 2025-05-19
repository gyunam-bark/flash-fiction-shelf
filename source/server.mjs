import express from 'express'
import cors from 'cors'
import novelRoutes from './routes/novel.routes.mjs'

export default class Server {
  #app
  #port

  constructor() {
    this.#app = express()
    this.#port = process.env.EXPRESS_PORT || 3000

    this.#initializeMiddlewares()
    this.#initializeRoutes()
  }

  #initializeMiddlewares() {
    this.#app.use(express.json())
    this.#app.use(cors())
  }

  #initializeRoutes() {
    this.#app.use('/novels', novelRoutes)
  }

  run() {
    this.#app.listen(this.#port, () => {
      console.log(`server is running at http://localhost:${this.#port}`)
    })
  }
}