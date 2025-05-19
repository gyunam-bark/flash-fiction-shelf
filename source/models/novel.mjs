import mongoose from 'mongoose'

const novelSchema = new mongoose.Schema({
  author: {
    type: String,
    default: 'anonymous',
    trim: true,
    maxlength: 64
  },
  content: {
    type: String,
    required: true,
    maxlength: 255,
    set: v => v.endsWith('.') ? v : `${v}.`
  },
  password: {
    type: String,
    required: true,
    maxlength: 64
  },
  reference: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel' },
  series: { type: String },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

export default mongoose.model('Novel', novelSchema)