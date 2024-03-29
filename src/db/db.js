import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://floorapp355:J1YmCDnTvZsAvGmt@floorapp.ysgurtu.mongodb.net/my-app?retryWrites=true&w=majority&appName=floorapp", {
        useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10, // Adjust pool size as needed
      retryWrites: true, // Enable retryable writes
      // Additional options
      serverSelectionTimeoutMS: 5000, // Timeout for server selection when connecting
      socketTimeoutMS: 45000 // How long the MongoDB driver waits before timing out a query
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export default connectMongoDB;
