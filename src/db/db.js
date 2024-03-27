const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://floorapp355:J1YmCDnTvZsAvGmt@floorapp.ysgurtu.mongodb.net/my-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Additional options
      useFindAndModify: false, // Set to false to use native findOneAndUpdate() instead of findAndModify()
      useCreateIndex: true, // Ensure indexes are created when defining schemas
      autoIndex: false, // Set to false to disable automatic index creation (only use in production if you manage indexes manually)
      poolSize: 10, // Maximum number of connections in the connection pool
      socketTimeoutMS: 30000, // How long the MongoDB driver waits before timing out a query
      keepAlive: true, // Whether to use TCP keep-alive
      connectTimeoutMS: 30000, // How long the MongoDB driver waits before timing out a connection attempt
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
enale all request d
