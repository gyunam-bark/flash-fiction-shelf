import Novel from '../models/novel.mjs'

export default class NovelRepository {
  async create(data) {
    return await Novel.create(data)
  }

  async findById(id) {
    return await Novel.findOne({ _id: id, isActive: true }).populate('reference')
  }

  async findBySeries(series) {
    return await Novel.find({ series, isActive: true })
  }

  async findByReference(referenceId) {
    return await Novel.find({ reference: referenceId, isActive: true })
  }

  async updateById(id, update) {
    return await Novel.findOneAndUpdate({ _id: id, isActive: true }, update, { new: true })
  }

  async deactivateById(id) {
    return await Novel.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false }, { new: true })
  }

  async findWithPagination(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const [total, novels] = await Promise.all([
      Novel.countDocuments({ isActive: true }),
      Novel.find({ isActive: true }).skip(skip).limit(limit)
    ])
    return { total, novels }
  }
}