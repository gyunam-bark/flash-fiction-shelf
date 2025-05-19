import NovelService from '../services/novel.service.mjs'

export default class NovelController {
  #service

  constructor() {
    this.#service = new NovelService()
  }

  create = async (req, res) => {
    try {
      const novel = await this.#service.createNovel(req.body)
      res.status(201).json(novel)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  get = async (req, res) => {
    try {
      const novel = await this.#service.getNovel(req.params.id)
      if (!novel) return res.status(404).json({ error: 'Not found' })
      res.json(novel)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  update = async (req, res) => {
    try {
      const novel = await this.#service.updateNovel(
        req.params.id,
        req.body.password,
        req.body
      )
      res.json(novel)
    } catch (err) {
      res.status(err.message === 'Unauthorized' ? 403 : 400).json({ error: err.message })
    }
  }

  deactivate = async (req, res) => {
    try {
      const novel = await this.#service.deactivateNovel(
        req.params.id,
        req.body.password
      )
      res.json(novel)
    } catch (err) {
      res.status(err.message === 'Unauthorized' ? 403 : 400).json({ error: err.message })
    }
  }

  getBySeries = async (req, res) => {
    try {
      const novels = await this.#service.getBySeries(req.query.series)
      res.json(novels)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  getByReference = async (req, res) => {
    try {
      const novels = await this.#service.getByReference(req.query.referenceId)
      res.json(novels)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    try {
      const { total, novels } = await this.#service.getAllPaginated(page, limit)
      res.json({ total, page, limit, novels })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}