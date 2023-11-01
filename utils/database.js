import mongoose from "mongoose";

const connectDB = async () => {
  try {
    /* prevent redundant connection attempts here */
    if (mongoose.connections[0].readyState) {
      return true;
    }
    /* establish database connection here */
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected...");
    return true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
