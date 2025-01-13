import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDb", error?.message);
  }
};

export default connectMongo;
