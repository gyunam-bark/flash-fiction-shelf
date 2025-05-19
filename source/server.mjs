import express from 'express'
import cors from 'cors'
import novelRoutes from './routes/novel.routes.mjs'
import swaggerSpec from './docs/swagger.mjs'
import swaggerUi from 'swagger-ui-express'

export default class Server {
  #app
  #port

  constructor() {
    this.#app = express()
    this.#port = process.env.EXPRESS_PORT || 3000

    this.#initializeMiddlewares()
    this.#initializeRoutes()
    this.#initializeSwagger()
  }

  #initializeMiddlewares() {
    this.#app.use(express.json())
    this.#app.use(cors())
  }

  #initializeRoutes() {
    this.#app.use('/novels', novelRoutes)
  }

  #initializeSwagger() {
    this.#app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }

  run() {
    this.#app.listen(this.#port, () => {
      console.log(`server is running at http://localhost:${this.#port}`)
    })
  }
}