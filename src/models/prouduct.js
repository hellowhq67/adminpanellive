import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  shippings: Number,
  productImage1: String,
  productImage2: String,
  productImage3: String,
  productImage4: String,
  productImage5: String,
  designers: String,
  productName: String,
  size: String,
  color: String,
  price: Number,
  floorPrice:Number,
  description: String,
  vendor: String,
  condition: String,
  department: String,
  category: String,
  subcategory: String,
  tag: Array,
  acceptOffer: Boolean,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product