import mongoose, { Connection } from "mongoose";

const connections: { [key: string]: Connection } = {};

const connectDB = async (cluster: string): Promise<Connection | void> => {
 try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    if (cluster == "Events") {
      const conn = await mongoose.connect(uri);
      const connection = mongoose.connection.useDb("Events");
      console.log("Connected to MongoDB database Events.");
      return connection;
    } else if (cluster == "Users") {
      const conn = await mongoose.connect(uri);
      const connection = mongoose.connection.useDb("Users");
      console.log("Connected to MongoDB database Users.");
      return connection;
    }

  } catch (error) {
     console.log("Error connecting to MongoDB:", (error as Error).message);
  } 

     
};


export default connectDB;