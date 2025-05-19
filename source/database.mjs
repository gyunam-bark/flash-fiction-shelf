import mongoose from "mongoose"

export default class Database {
  async connect() {
    try {
      await mongoose.connect(process.env.MONGOOSE_URL)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }

  async disconnect() {
    await mongoose.disconnect()
  }
}