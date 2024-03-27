import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://floorapp355:J1YmCDnTvZsAvGmt@floorapp.ysgurtu.mongodb.net/my-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options
      serverSelectionTimeoutMS: 5000, // Timeout for server selection when connecting
      socketTimeoutMS: 45000, // How long the MongoDB driver waits before timing out a query
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectMongoDB;
