import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema({
  userId: String,
  productId:String,
});

const Follow = mongoose.models.Follow || mongoose.model('Follow', FollowSchema);

export default Follow;