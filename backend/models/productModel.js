import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  imagePublicId: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);

export default productModel;
