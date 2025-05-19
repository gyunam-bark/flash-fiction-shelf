import dotenv from 'dotenv'
dotenv.config()

import Server from './source/server.mjs'
import Database from './source/database.mjs'

const main = async () => {
  const database = new Database()
  await database.connect()

  const server = new Server()
  server.run()
}

main()