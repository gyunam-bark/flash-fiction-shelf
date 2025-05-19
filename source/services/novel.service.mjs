import NovelRepository from '../repositories/novel.repository.mjs'

export default class NovelService {
  #repository
  #masterPassword

  constructor() {
    this.#repository = new NovelRepository()
    this.#masterPassword = process.env.MASTER_PASSWORD
  }

  async createNovel(data) {
    return await this.#repository.create(data)
  }

  async getNovel(id) {
    return await this.#repository.findById(id)
  }

  async getBySeries(series) {
    return await this.#repository.findBySeries(series)
  }

  async getByReference(referenceId) {
    return await this.#repository.findByReference(referenceId)
  }

  async updateNovel(id, password, updateData) {
    const novel = await this.#repository.findById(id)
    if (!novel) throw new Error('Not found')
    if (novel.password !== password && password !== this.#masterPassword) {
      throw new Error('Unauthorized')
    }
    return await this.#repository.updateById(id, updateData)
  }

  async deactivateNovel(id, password) {
    const novel = await this.#repository.findById(id)
    if (!novel) throw new Error('Not found')
    if (novel.password !== password && password !== this.#masterPassword) {
      throw new Error('Unauthorized')
    }
    return await this.#repository.deactivateById(id)
  }

  async getAllPaginated(page, limit) {
    return await this.#repository.findWithPagination(page, limit)
  }
}