import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://floorapp355:J1YmCDnTvZsAvGmt@floorapp.ysgurtu.mongodb.net/my-app?retryWrites=true&w=majority&appName=floorapp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false, // Disable deprecated findOneAndUpdate
      useCreateIndex: true // Ensure indexes are built
    });
    
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;
