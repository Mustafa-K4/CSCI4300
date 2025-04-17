import mongoose from "mongoose";



const connectDB = async (cluster: string): Promise<void> => {
 try {
    let uri = " ";

    if (cluster == "events" && process.env.MONGODB_URI_EVENTS) {
      uri = process.env.MONGODB_URI_EVENTS;
    } else if (cluster == "users" && process.env.MONGODB_URI_USERS) {
      uri = process.env.MONGODB_URI_USERS;
    }

    if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
    }


    await mongoose.connect(uri);
    console.log("Connected to MongoDB.");
  } catch (error) {
     console.log("Error connecting to MongoDB:", (error as Error).message);
  } 
};


export default connectDB;