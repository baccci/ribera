import { models, Schema, model } from 'mongoose'

const productSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'Product'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  available: {
    type: Boolean,
    required: true,
    default: false
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  category: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true,
    default: ''
  }
}, { versionKey: false })

export default models.Product || model('Product', productSchema)
