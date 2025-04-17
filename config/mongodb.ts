import mongoose, { Connection } from "mongoose";

const connections: { [key: string]: Connection } = {};

const connectDB = async (cluster: string): Promise<Connection | void> => {
 try {
    let uri = " ";

    if (cluster == "Events" && process.env.MONGODB_URI_EVENTS) {
      uri = process.env.MONGODB_URI_EVENTS;
    } else if (cluster == "Users" && process.env.MONGODB_URI_USERS) {
      uri = process.env.MONGODB_URI_USERS;
    }



    if (!uri) {
     throw new Error("MONGODB_URI is not defined in environment variables.");
    }


    if (connections[cluster]) {
      console.log(`Reusing existing connection for cluster "${cluster}".`);
      return connections[cluster];
    }

    const connection = await mongoose.createConnection(uri).asPromise();
    connections[cluster] = connection;
    console.log(`Connected to MongoDB cluster "${cluster}".`);
    return connection;

  } catch (error) {
     console.log("Error connecting to MongoDB:", (error as Error).message);
  } 
};


export default connectDB;